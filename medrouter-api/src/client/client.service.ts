import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ClientDto } from './dtos/cliente-dto';
import { Client } from './models/client.entity';
import { AuthSingUpDto } from 'src/auth/dto/auth-signup.dto';
import { generatePass } from 'src/utils/hash-pass';
import { SearchClientDto } from './dtos/search-client-dto';
import { SearchResultDto } from './dtos/search-result-dto';
import { User } from 'src/users/models/user.entity';
import { DocDto } from 'src/docs/dto/doc.dto';
import { Role } from 'src/auth/enums/role.enum';
import { DocsService } from 'src/docs/docs.service';
import { doc } from 'prettier';

@Injectable()
export class ClientService {
  constructor(private us: UsersService, private ds: DocsService) {}

  async create(client: AuthSingUpDto): Promise<any> {
    client.password = generatePass();
    client.passwordConfirmation = client.password;

    const user = await this.us.signUp(client);

    const cliente = new Client();

    cliente.user = user;

    try {
      await cliente.save();
    } catch (error) {
      throw new InternalServerErrorException('Fail at create client');
    }

    return client;
  }

  async updateStatus(id: string, checked: boolean): Promise<void> {
    const client = await Client.findOne({ where: { id } });

    if (client.doc?.url === undefined || client.doc?.url === null) {
      throw new BadRequestException('Not allowed');
    }

    client.user.checked = checked;

    try {
      await client.save();
    } catch (error) {
      throw new InternalServerErrorException('Update client status failure');
    }
  }

  async getAll(search: SearchClientDto): Promise<SearchResultDto[]> {
    const { page, username } = search;

    const pageNumber: number = page ? page * 10 - 10 : 0;

    const query = Client.createQueryBuilder('client');

    if (username) {
      query.andWhere(`user.username ILIKE '%${username}%'`);
    }

    const founds = await query
      .leftJoinAndSelect('client.user', 'user')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .leftJoinAndSelect('client.doc', 'doc')
      .skip(pageNumber)
      .take(10)
      .getMany();

    const clients: SearchResultDto[] = [
      ...founds.map((client: Client) => {
        return {
          id: client.id,
          doc: {
            url: client.doc?.url,
          },
          user: {
            userId: client.user.userId,
            username: client.user.username,
            fullname: client.user.fullname,
            email: client.user.email,
            phoneNumber: client.user.phoneNumber,
            birthday: client.user.birthdate,
            sex: client.user.sex,
            checked: client.user.checked,
            avatar: {
              avatarId: client.user.avatar?.avatarId,
              url: client.user.avatar?.url,
            },
          },
        };
      }),
    ];

    return clients;
  }

  async verify(id: string): Promise<void> {
    const client = await Client.findOne({ where: { id } });
    return await this.us.checkUser(client.user);
  }

  async updateDoc(id: string, user: User, doc: DocDto): Promise<void> {
    const client = await Client.findOne({ where: { id } });

    if (
      client.user.userId !== user.userId &&
      !user.role.find(rol => rol === Role.RECEPT)
    ) {
      throw new UnauthorizedException('Action not allowed');
    }

    const document = await this.ds.getOne(doc.id);

    client.doc = document;

    try {
      await client.save();
    } catch (error) {
      throw new InternalServerErrorException('Update client doc failure');
    }
  }
}
