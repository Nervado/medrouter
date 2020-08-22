import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Body,
  ValidationPipe,
  Query,
  Patch,
  Param,
} from '@nestjs/common';

import { ClientDto } from './dtos/cliente-dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-auth.guard';
import { AlowGuard } from 'src/auth/guards/allow-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ClientService } from './client.service';
import { AuthSingUpDto } from 'src/auth/dto/auth-signup.dto';
import { SearchClientDto } from './dtos/search-client-dto';
import { SearchResultDto } from './dtos/search-result-dto';

import { GetUser } from 'src/users/decorators/get-user.decorator';
import { User } from 'src/users/models/user.entity';
import { Allow } from 'src/auth/decorators/alow.decorator';
import { DocDto } from 'src/docs/dto/doc.dto';
import { Role } from 'src/auth/enums/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard, AlowGuard)
@Controller('clients')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post()
  @Roles('recept')
  @UseInterceptors(ClassSerializerInterceptor)
  createCliente(@Body(ValidationPipe) body: AuthSingUpDto): Promise<ClientDto> {
    return this.clientService.create(body);
  }

  @Get()
  @Roles('recept')
  getClients(@Query() search: SearchClientDto): Promise<SearchResultDto[]> {
    return this.clientService.getAll(search);
  }

  @Patch('/:id')
  @Allow('recept', 'client')
  @UseInterceptors(ClassSerializerInterceptor)
  updateDoc(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() body: DocDto,
  ): Promise<void> {
    return this.clientService.updateDoc(id, user, body);
  }

  @Patch('/:id/status')
  @Allow('recept')
  @UseInterceptors(ClassSerializerInterceptor)
  updateStatus(
    @Param('id') id: string,
    @Body('checked') checked: boolean,
  ): Promise<void> {
    return this.clientService.updateStatus(id, checked);
  }

  @Get('data-graph')
  createDoctor(): any {
    return [
      {
        letter: 'A',
        frequency: 0.08167,
      },
      {
        letter: 'B',
        frequency: 0.01492,
      },
      {
        letter: 'C',
        frequency: 0.02782,
      },
      {
        letter: 'D',
        frequency: 0.04253,
      },
      {
        letter: 'E',
        frequency: 0.12702,
      },
      {
        letter: 'F',
        frequency: 0.02288,
      },
      {
        letter: 'G',
        frequency: 0.02015,
      },
      {
        letter: 'H',
        frequency: 0.06094,
      },
      {
        letter: 'I',
        frequency: 0.06966,
      },
      {
        letter: 'J',
        frequency: 0.00153,
      },
      {
        letter: 'K',
        frequency: 0.00772,
      },
      {
        letter: 'L',
        frequency: 0.04025,
      },
      {
        letter: 'M',
        frequency: 0.02406,
      },
      {
        letter: 'N',
        frequency: 0.06749,
      },
      {
        letter: 'O',
        frequency: 0.07507,
      },
      {
        letter: 'P',
        frequency: 0.01929,
      },
      {
        letter: 'Q',
        frequency: 0.00095,
      },
      {
        letter: 'R',
        frequency: 0.05987,
      },
      {
        letter: 'S',
        frequency: 0.06327,
      },
      {
        letter: 'T',
        frequency: 0.09056,
      },
      {
        letter: 'U',
        frequency: 0.02758,
      },
      {
        letter: 'V',
        frequency: 0.00978,
      },
      {
        letter: 'W',
        frequency: 0.0236,
      },
      {
        letter: 'X',
        frequency: 0.0015,
      },
      {
        letter: 'Y',
        frequency: 0.01974,
      },
      {
        letter: 'Z',
        frequency: 0.00074,
      },
    ];
  }
}
