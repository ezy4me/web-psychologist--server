import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class ChatService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createSession(psychologistId: number, patientId: number) {
    await this.databaseService.chat.create({
      data: {
        psychologistId,
        patientId,
        status: true,
      },
    });
  }

  async openSession(chatId: number) {
    return this.databaseService.chat.update({
      where: {
        id: chatId,
      },
      data: {
        status: true,
      },
    });
  }

  async closeSession(chatId: number) {
    return this.databaseService.chat.update({
      where: {
        id: chatId,
      },
      data: {
        status: false,
      },
    });
  }

  async createMessage(dto: MessageDto) {
    const message = await this.databaseService.message.create({
      data: {
        text: dto.text,
        userId: dto.userId,
        dateTime: new Date(),
      },
    });

    if (message) {
      await this.databaseService.chatHistory.create({
        data: {
          messageId: message.id,
          chatId: dto.chatId,
        },
      });
    }

    return message;
  }

  async getMessages(psychologistId: number, patientId: number) {
    const chat = await this.getUserChat(psychologistId, patientId);

    console.log(chat);

    if (chat) {
      return this.databaseService.chatHistory.findMany({
        where: {
          chatId: chat[0].id,
        },
        include: {
          message: {
            include: {
              user: {
                select: {
                  email: true,
                  id: true,
                  profile: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    }
  }

  async getUserChat(psychologistId: number, patientId: number) {
    const psychologist = await this.databaseService.psychologist.findFirst({
      where: {
        userId: psychologistId,
      },
    });

    if (!psychologist) {
      throw new NotFoundException(
        `Psychologist with ID ${psychologistId} not found`,
      );
    }

    const chat = await this.databaseService.chat.findMany({
      where: { patientId, psychologistId: psychologist.id },
    });

    if (!chat[0]) {
      this.createSession(psychologist.id, patientId);
    }

    return chat;
  }
}
