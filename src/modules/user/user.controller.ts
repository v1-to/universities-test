import { Public } from '@auth/jwt.guard';
import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { User } from '@user/user.schema';
import { UserService } from '@user/user.service';
import { MongooseError, ObjectId } from 'mongoose';

@Controller('users')
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

  @Public()
  @Put('/:id/change-password')
  changePassword(
    @Param('id') _id: ObjectId,
    @Body() { password }: Pick<User, 'password'>,
    @Res() response: any,
  ) {
    this.userService
      .changePassword({ _id, password })
      .then(() => response.status(HttpStatus.NO_CONTENT).send())
      .catch((err: MongooseError) =>
        response.status(HttpStatus.BAD_REQUEST).send({ error: err.message }),
      );
  }
}
