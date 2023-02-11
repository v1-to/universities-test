import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
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
}
