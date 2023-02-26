import { BaseController } from '@base/base.controller';
import { Controller } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { University } from '@university/university.schema';
import { UniversityService } from '@university/university.service';

@ApiTags('universities')
@ApiExtraModels(University)
@Controller('universities')
export class UniversityController extends BaseController<University> {
  constructor(readonly universityService: UniversityService) {
    super(universityService);
  }
}
