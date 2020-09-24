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
    if (id !== user.userId) {
      throw new BadRequestException('Not allowed');
    }

    ids.forEach(async _id => {
      const message = await this.messageModel
        .findOne({ _id, receiver: id })
        .exec();

      try {
        message.read = true;

        await message.save();
      } catch (error) {
        throw new InternalServerErrorException('Fail at update status message');
      }
    });
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

  async findAllMessages(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  async getAllUserContacts(id: string, user: User): Promise<ClientWsDto[]> {
    if (user.userId !== id) {
      throw new BadGatewayException('Not allowed');
    }

    const messagesWithUser = await this.messageModel
      .find({ receiver: id })
      .exec();

    if (!messagesWithUser) {
      return [];
    }

    const ids: string[] = messagesWithUser.map(msg => msg.sender);

    const setIds = [...new Set(ids)];

    console.log(setIds);

    let contacts: ClientWsDto[] = [];

    setIds.forEach(async id => {
      const user = await this.chatUserModel.findOne({ id }).exec();
      contacts.push(user);
    });

    return contacts;
  }

  async searchMessages(
    id: string,
    page: number,
    user: User,
  ): Promise<MessageDto[]> {
    const pageNumber: number = page ? page * 5 - 5 : 0;

    if (id !== user.userId) {
      throw new UnauthorizedException('Not allowe retrive messages');
    }

    const messages = await this.messageModel
      .find({ sender: id })
      .limit(5)
      .skip(pageNumber)
      .sort({
        date: 'asc',
      })
      .exec();

    return messages;
  }
}
