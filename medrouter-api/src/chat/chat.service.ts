import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientWsDto } from './dtos/client.dto';
import { Model } from 'mongoose';

import { User } from 'src/users/models/user.entity';
import { Message } from './schemas/notification.schema';
import { ChatUser } from './schemas/chat-user.schema';
import { MessageDto } from './dtos/message.dto';

@Injectable()
export class ChatService {
  private clients: ClientWsDto[] = [];

  constructor(
    @InjectModel('Message') private messageModel: Model<Message>,
    @InjectModel('ChatUser') private chatUserModel: Model<ChatUser>,
  ) {}

  async add(client: ClientWsDto): Promise<void> {
    this.clients.push(client);

    const cli = await this.chatUserModel.findOne({ id: `${client.id}` }).exec();

    if (cli === null) {
      this.AddChatUser(client);
    }

    if (client.avatar !== undefined) {
      cli.avatar = client.avatar;

      try {
        await cli.save();
      } catch (error) {
        throw new BadGatewayException('Erro at update chat user avatar');
      }
    }
  }

  remove(id: string): void {
    this.clients = this.clients.filter(client => client.socket.id !== id);
  }

  get(id: string): ClientWsDto[] {
    console.log(
      this.clients.filter(client => client.id === id).length,
      'numer of founds',
    );

    return this.clients.filter(client => client.id === id);
  }

  getAll(id?: string): ClientWsDto[] {
    let results = [];

    if (id !== undefined) {
      const clients = this.clients.filter(client => client.id !== id);
      clients.forEach(client => {
        if (!results.find(r => r.id === client.id)) {
          results.push(client);
        }
      });
    } else {
      this.clients.forEach(client => {
        if (!results.find(r => r.id === client.id)) {
          results.push(client);
        }
      });
    }

    return results;
  }

  async markAsRead(id: string, ids: string[], user: User): Promise<void> {
    console.log(ids);

    if (id !== user.userId) {
      throw new BadRequestException('Not allowed');
    }

    for (const _id of ids) {
      const message = await this.messageModel
        .findOne({ _id, receiver: id })
        .exec();

      try {
        message.read = true;

        await message.save();
      } catch (error) {
        throw new InternalServerErrorException('Fail at update status message');
      }
    }
  }

  async AddMessage(message: MessageDto): Promise<Message> {
    const created = new this.messageModel(message);

    try {
      return await created.save();
    } catch (error) {
      throw new BadGatewayException('Error at save new message');
    }
  }

  async AddChatUser(client: ClientWsDto): Promise<ClientWsDto> {
    const created = new this.chatUserModel({
      id: client.id,
      avatar: client.avatar,
      username: client.username,
      fullname: client.fullname,
      surname: client.surname,
    });

    try {
      return created.save();
    } catch (error) {
      throw new BadGatewayException('Error at save new client');
    }
  }

  async findAllUsers(user: User): Promise<ClientWsDto[]> {
    const results = await this.chatUserModel.find().exec();

    return results
      .map((cli: ClientWsDto) => {
        cli.messages = [];
        return cli;
      })
      .filter(cli => cli.id !== user.userId);
  }

  async getAllUserContacts(id: string, user: User): Promise<ClientWsDto[]> {
    if (user.userId !== id) {
      throw new BadGatewayException('Not allowed');
    }

    const messagesWithUser = await this.messageModel
      .find({ $or: [{ sender: id }, { receiver: id }] })
      .exec();

    if (!messagesWithUser) {
      return [];
    }

    const ids: string[] = messagesWithUser.map(msg => {
      if (msg.sender === id) {
        return msg.receiver;
      } else {
        return msg.sender;
      }
    });

    const setIds = [...new Set(ids)];

    let results = [];

    for (const userId of setIds) {
      results.push(await this.chatUserModel.findOne({ id: userId }).exec());
    }

    for (const result of results) {
      const messages = await this.searchMessages(id, result.id, 1, user);

      result.messages = messages;
    }

    return results.map((_user: ChatUser) => {
      return {
        id: _user.id,
        avatar: _user.avatar,
        username: _user.username,
        fullname: _user.fullname,
        surname: _user.surname,
        online: false,
        messages: _user.messages,
      };
    });
  }

  async searchMessages(
    id: string,
    id_receiver: string,
    page: number,
    user: User,
  ): Promise<MessageDto[]> {
    const limit = 10;
    const pageNumber: number = page ? page * limit - limit : 0;

    if (id !== user.userId) {
      throw new UnauthorizedException('Not allow retrive this messages');
    }

    const messages = await this.messageModel

      .find({
        $or: [
          { sender: id, receiver: id_receiver },
          { sender: id_receiver, receiver: id },
        ],
      })
      .limit(limit)
      .skip(pageNumber)
      .sort({
        date: 'desc',
      })
      .exec();

    return messages.reverse();
  }
}
