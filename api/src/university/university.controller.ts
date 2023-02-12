import {
  Body,
  Controller,
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
import { University } from '@university/university.schema';
import {
  UniversityService,
  UpdateUniversityData,
} from '@university/university.service';
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
      .then((res) => {
        if (!res) response.status(HttpStatus.NOT_FOUND).send();
        else response.status(HttpStatus.OK).send(res);
      })
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

  @Put('/:id')
  updateUniversity(
    @Param('id') id: string,
    @Body() universityData: UpdateUniversityData,
    @Res() response: any,
  ) {
    this.universityService
      .updateUniversity(id, universityData)
      .then((res) => response.status(HttpStatus.OK).send(res))
      .catch((err: MongooseError) =>
        response.status(HttpStatus.BAD_REQUEST).send({ error: err.message }),
      );
  }

  @Delete('/:id')
  deleteUniversity(@Param('id') id: string, @Res() response: any) {
    this.universityService
      .deleteUniversity(id)
      .then(() => response.status(HttpStatus.NO_CONTENT).send())
      .catch((err: MongooseError) =>
        response.status(HttpStatus.BAD_REQUEST).send({ error: err.message }),
      );
  }
}
