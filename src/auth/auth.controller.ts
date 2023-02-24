import { AuthService } from '@auth/auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@user/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() { login, password }: Pick<User, 'login' | 'password'>) {
    return this.authService.login({ login, password });
  }
}
