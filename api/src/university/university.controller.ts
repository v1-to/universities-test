import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
  Res,
} from '@nestjs/common';
import { UniversityService } from '@university/university.service';

@Controller('universities')
export class UniversityController {
  constructor(readonly universityService: UniversityService) {}

  @Get('/')
  listUniversities(
    @Query('country') country?: string,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page?: number,
  ) {
    return this.universityService.listUniversities({ country, page });
  }

  @Get('/:id')
  async findUniversityById(@Param('id') id: string, @Res() response: any) {
    const university = await this.universityService.findUniversityById({ id });

    if (university) response.status(HttpStatus.OK).send(university);

    response.status(HttpStatus.NOT_FOUND).send();
  }
}
