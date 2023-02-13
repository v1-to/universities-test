import { BaseService } from '@base/base.service';
import {
  Body,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { MongooseError } from 'mongoose';

export abstract class BaseController<T> {
  constructor(readonly resourceService: BaseService<T>) {}

  @Get('/')
  listResource(
    @Query() filters?: Record<string, string | number>,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page?: number,
  ): Promise<T[]> {
    return this.resourceService.listResource({ ...filters, page });
  }

  @Get('/:id')
  findResourceById(@Param('id') id: string, @Res() response: any) {
    this.resourceService
      .findResourceById({ id })
      .then((res) => {
        if (!res) response.status(HttpStatus.NOT_FOUND).send();
        else response.status(HttpStatus.OK).send(res);
      })
      .catch((err: MongooseError) =>
        response.status(HttpStatus.BAD_REQUEST).send(err),
      );
  }

  @Post('/')
  insertResource(@Body() resource: T, @Res() response: any) {
    this.resourceService
      .insertResource(resource)
      .then((res) => response.status(HttpStatus.CREATED).send(res))
      .catch((err: MongooseError) =>
        response.status(HttpStatus.BAD_REQUEST).send({ error: err.message }),
      );
  }

  @Put('/:id')
  updateResource(
    @Param('id') id: string,
    @Body() resource: T,
    @Res() response: any,
  ) {
    this.resourceService
      .updateResource(id, resource)
      .then((res) => response.status(HttpStatus.OK).send(res))
      .catch((err: MongooseError) =>
        response.status(HttpStatus.BAD_REQUEST).send({ error: err.message }),
      );
  }

  @Delete('/:id')
  deleteResource(@Param('id') id: string, @Res() response: any) {
    this.resourceService
      .deleteResource(id)
      .then(() => response.status(HttpStatus.NO_CONTENT).send())
      .catch((err: MongooseError) =>
        response.status(HttpStatus.BAD_REQUEST).send({ error: err.message }),
      );
  }
}
