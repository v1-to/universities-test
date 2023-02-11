import { Controller, Get } from '@nestjs/common';
import { UniversityService } from '@university/university.service';

@Controller('universities')
export class UniversityController {
  constructor(readonly universityService: UniversityService) {}

  @Get('/')
  listUniversities() {
    return this.universityService.listUniversities();
  }
}
