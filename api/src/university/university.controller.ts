import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { University } from '@university/university.schema';
import { UniversityService } from '@university/university.service';
import { MongooseError } from 'mongoose';

@Controller('universities')
export class UniversityController {
  constructor(readonly universityService: UniversityService) {}

  @Get('/')
  listUniversities(
    @Query('country') country?: string,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page?: number,
  ): Promise<University[]> {
    return this.universityService.listUniversities({ country, page });
  }

  @Get('/:id')
  findUniversityById(@Param('id') id: string, @Res() response: any) {
    this.universityService
      .findUniversityById({ id })
      .then((res) => response.status(HttpStatus.OK).send(res))
      .catch((err: MongooseError) =>
        response.status(HttpStatus.BAD_REQUEST).send(err),
      );
  }

  @Post('/')
  insertUniversity(@Body() university: University, @Res() response: any) {
    this.universityService
      .insertUniversity(university)
      .then((res) => response.status(HttpStatus.CREATED).send(res))
      .catch((err: MongooseError) =>
        response.status(HttpStatus.BAD_REQUEST).send({ error: err.message }),
      );
  }
}
