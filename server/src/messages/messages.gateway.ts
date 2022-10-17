import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {MessagesService} from './messages.service';
import {CreateMessageDto} from './dto/create-message.dto';
import {Server, Socket} from 'socket.io'
import { TypingMessageDto } from './dto/typing-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class MessagesGateway {
  constructor(private readonly messagesService: MessagesService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createMessage')
  async create(
      @MessageBody() createMessageDto: CreateMessageDto,
      @ConnectedSocket() client: Socket
  ) {
    const message = await this.messagesService.create(createMessageDto);
    this.server.emit('message', message);

    return message;
  };

  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  };

  @SubscribeMessage('typingText')
  async typingText(
      @MessageBody() data: TypingMessageDto,
      @ConnectedSocket() client: Socket,
  ) {
    client.broadcast.emit('typingText', { ...data });
  };
}
