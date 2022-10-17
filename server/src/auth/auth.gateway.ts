import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {AuthService} from './auth.service';
import {Server, Socket} from 'socket.io'
import { AuthUserInputDto } from './dto/auth-user-input.dto';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class AuthGateway {
  constructor(private readonly authService: AuthService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join')
  join(
      @MessageBody() user: AuthUserInputDto,
      @ConnectedSocket() client: Socket,
  ) {
    this.authService.createUser(user);

    return this.authService.identify(user.name, client.id);
  };
}
