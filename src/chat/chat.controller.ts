import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { MessageDto } from './dto/message.dto';
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async getMessages(
    @Query('psychologistId', ParseIntPipe) psychologistId: number,
    @Query('patientId', ParseIntPipe) patientId: number,
  ) {
    return this.chatService.getMessages(psychologistId, patientId);
  }

  @Get('/user')
  async getUserChat(
    @Query('psychologistId', ParseIntPipe) psychologistId: number,
    @Query('patientId', ParseIntPipe) patientId: number,
  ) {
    return this.chatService.getUserChat(psychologistId, patientId);
  }

  @Post('message')
  async createMessage(@Body() messageDto: MessageDto) {
    return this.chatService.createMessage(messageDto);
  }
}
