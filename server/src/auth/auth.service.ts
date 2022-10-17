import {Injectable} from '@nestjs/common';
import {User} from './entities/user.entity';
import {AuthUserInputDto} from "./dto/auth-user-input.dto";

@Injectable()
export class AuthService {
  users: User[] = [];

  createUser(data: AuthUserInputDto) {
    const foundUser = this.users.filter(item => item.name === data.name)[0];
    if (!foundUser) {
      const user = {
        id: Date.now(),
        name: data.name,
        userWsId: null,
      };
      this.users.push(user);

      return user;
    }

    return foundUser;
  };

  identify(name: string, clientWsId: string) {
    return this.users.filter(item => item.name === name ? item.userWsId = clientWsId : null)[0];
  };

  getUser(clientId: number) {
    return this.users.filter(item => item.id === clientId);
  };

  findAll() {
    return this.users;
  };
}
