import { AuthService } from '@auth/auth.service';
import { Public } from '@auth/jwt.guard';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '@user/user.schema';
import { MongooseError } from 'mongoose';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiOkResponse({
    description: 'If login successful returns the access_token',
  })
  @ApiUnauthorizedResponse({ description: 'When login fails' })
  @ApiBody({
    description:
      'The login and password of the User ({ login: string, password: string })',
    type: Object,
    required: true,
  })
  @Post('login')
  async login(
    @Body() { login, password }: Pick<User, 'login' | 'password'>,
    @Res() response: any,
  ) {
    this.authService
      .login({ login, password })
      .then((res) => response.status(HttpStatus.OK).send(res))
      .catch((err: MongooseError) =>
        response.status(HttpStatus.UNAUTHORIZED).send({ error: err.message }),
      );
  }
}
