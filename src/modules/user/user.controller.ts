import { Public } from '@auth/jwt.guard';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { User } from '@user/user.schema';
import { UserService } from '@user/user.service';
import { MongooseError } from 'mongoose';

@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Public()
  @Post('/')
  insertResource(@Body() resource: User, @Res() response: any) {
    this.userService
      .insertResource(resource)
      .then((res) => response.status(HttpStatus.CREATED).send(res))
      .catch((err: MongooseError) =>
        response.status(HttpStatus.BAD_REQUEST).send({ error: err.message }),
      );
  }
}
