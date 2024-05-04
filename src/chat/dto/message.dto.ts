import { IsNumber, IsString } from 'class-validator';

export class MessageDto {
  @IsString()
  text: string;

  @IsNumber()
  userId: number;

  @IsNumber()
  chatId: number;
}
