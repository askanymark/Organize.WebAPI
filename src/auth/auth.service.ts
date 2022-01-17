import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this._userService._users.find(u => u?.userName === username);

    if (user && user.password === password) {
      const { ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user.userId };

    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this._jwtService.sign(payload),
    };
  }
}
