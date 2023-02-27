import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@user/user.schema';
import { UserService } from '@user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.userService.findResourceByLogin({ login });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login({ login, password }: Pick<User, 'login' | 'password'>) {
    const user = await this.validateUser(login, password);
    if (!user) throw new UnauthorizedException('Login failed');
    const payload = { login: user.login, userId: user._id };
    const { _id, name } = user;
    return { _id, name, access_token: this.jwtService.sign(payload) };
  }
}
