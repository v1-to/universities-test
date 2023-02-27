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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@user/user.schema';
import { UserService } from '@user/user.service';
import { MongooseError, ObjectId } from 'mongoose';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Public()
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'If the user was inserted' })
  @ApiBadRequestResponse({ description: 'If some error with insertion occurs' })
  @Post('/')
  insertResource(@Body() resource: User, @Res() response: any) {
    this.userService
      .insertResource(resource)
      .then((res) => response.status(HttpStatus.CREATED).send(res))
      .catch((err: MongooseError) =>
        response.status(HttpStatus.BAD_REQUEST).send({ message: err.message }),
      );
  }

  @ApiNoContentResponse({ description: 'If the password was updated' })
  @ApiBadRequestResponse({ description: 'If some error with update occurs' })
  @ApiParam({ name: 'id', description: 'The id of the resource' })
  @Put('/:id/change-password')
  changePassword(
    @Param('id') _id: ObjectId,
    @Body()
    { password, oldPassword }: Pick<User, 'password'> & { oldPassword: string },
    @Res() response: any,
  ) {
    this.userService
      .changePassword({ _id, password, oldPassword })
      .then(() => response.status(HttpStatus.NO_CONTENT).send())
      .catch((err: MongooseError) =>
        response.status(HttpStatus.BAD_REQUEST).send({ message: err.message }),
      );
  }
}
