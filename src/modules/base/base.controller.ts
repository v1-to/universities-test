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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { MongooseError } from 'mongoose';

@ApiBearerAuth()
export abstract class BaseController<T> {
  constructor(readonly resourceService: BaseService<T>) {}

  @ApiOkResponse({ description: 'An array of objects that match the filters' })
  @ApiQuery({
    name: 'page',
    description: 'The number of the page',
    required: false,
  })
  @ApiQuery({
    name: '<FILTER>',
    description:
      'A partial object with the filters of the resource (FILTER is keyof Resource)',
    required: false,
  })
  @Get('/')
  listResource(
    @Query() filters?: Record<string, string | number>,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page?: number,
  ): Promise<T[]> {
    return this.resourceService.listResource({ ...filters, page });
  }

  @ApiOkResponse({ description: 'An array of objects that match the filters' })
  @ApiNotFoundResponse({ description: 'If not found a resource with <id>' })
  @ApiBadRequestResponse({ description: 'If any other error occurs' })
  @ApiParam({
    name: 'id',
    description: 'The id of the resource',
    required: true,
  })
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

  @ApiCreatedResponse({ description: 'If the resource was inserted' })
  @ApiBadRequestResponse({ description: 'If some error with insertion occurs' })
  @ApiBody({
    description: 'The resource to be inserted',
    type: Object,
    required: true,
  })
  @Post('/')
  insertResource(@Body() resource: T, @Res() response: any) {
    this.resourceService
      .insertResource(resource)
      .then((res) => response.status(HttpStatus.CREATED).send(res))
      .catch((err: MongooseError) =>
        response.status(HttpStatus.BAD_REQUEST).send({ error: err.message }),
      );
  }

  @ApiOkResponse({ description: 'If the resource was updated' })
  @ApiBadRequestResponse({ description: 'If some error with update occurs' })
  @ApiParam({ name: 'id', description: 'The id of the resource' })
  @ApiBody({
    description: 'A partial object with the update of the resource ',
    type: Object,
    required: true,
  })
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

  @ApiNoContentResponse({ description: 'If deletion is successful' })
  @ApiBadRequestResponse({ description: 'If some error with deletion occurs' })
  @ApiParam({ name: 'id', description: 'The id of the resource' })
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
