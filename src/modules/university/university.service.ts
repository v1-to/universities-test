import { BaseService } from '@base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { University, UniversityDocument } from '@university/university.schema';
import { Model } from 'mongoose';

@Injectable()
export class UniversityService extends BaseService<University> {
  fieldsShownInResourceListing = ['name', 'country', 'state-province'];

  constructor(
    @InjectModel(University.name)
    private universityModel: Model<UniversityDocument>,
  ) {
    super(universityModel);
  }
}
