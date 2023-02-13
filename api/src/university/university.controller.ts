import { BaseController } from '@base/base.controller';
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
import { UniversityService } from '@university/university.service';

@Controller('universities')
export class UniversityController extends BaseController<University> {
  constructor(readonly universityService: UniversityService) {
    super(universityService);
  }
}
