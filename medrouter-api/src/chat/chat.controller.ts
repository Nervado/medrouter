import {
  All,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';

import { Allow } from 'src/auth/decorators/alow.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { User } from 'src/users/models/user.entity';
import { ChatService } from './chat.service';
import { ChatRequestDto } from './dtos/chat-request.dto';
import { ClientWsDto } from './dtos/client.dto';
import { MessageDto } from './dtos/message.dto';

@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  @Allow('recept', 'client')
  createDoctor(@Body() body: ChatRequestDto) {
    //return this.chatService.create(body);
  }

  @Get('/:id')
  retriveContacts(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<ClientWsDto[]> {
    return this.chatService.getAllUserContacts(id, user);
  }

  @Patch('/:id/messages')
  updateStatusMessage(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body('ids') ids: string[],
  ): Promise<void> {
    return this.chatService.markAsRead(id, ids, user);
  }

  @Get('/:id/messages')
  getMessages(
    @Param('id') id: string,
    @GetUser() user: User,
    @Query('page') page: number,
  ): Promise<MessageDto[]> {
    return this.chatService.searchMessages(id, page, user);
  }
}