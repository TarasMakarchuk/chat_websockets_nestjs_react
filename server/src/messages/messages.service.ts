import {Injectable} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import {Message} from "./entities/message.entity";

@Injectable()
export class MessagesService {
  messages: Message[] = [];

  create(createMessageDto: CreateMessageDto) {
    const message = {
      id: Date.now(),
      name: createMessageDto.name,
      text: createMessageDto.text,
    }
    this.messages.push(message);

    return message;
  };

  findAll() {
    return this.messages;
  };
}
