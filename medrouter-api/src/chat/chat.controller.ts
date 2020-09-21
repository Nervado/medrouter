import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';

import { Allow } from 'src/auth/decorators/alow.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChatService } from './chat.service';
import { ChatRequestDto } from './dtos/chat-request.dto';

@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}
  @Post()
  @Allow('recept', 'client')
  @UseInterceptors(ClassSerializerInterceptor)
  createDoctor(@Body(ValidationPipe) body: ChatRequestDto) {
    //return this.chatService.create(body);
  }
}
