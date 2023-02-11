import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { University, UniversityDocument } from '@university/university.schema';
import { Model } from 'mongoose';

@Injectable()
export class UniversityService {
  constructor(
    @InjectModel(University.name)
    private universityModel: Model<UniversityDocument>,
  ) {}

  async listUniversities(): Promise<University[]> {
    return this.universityModel.find({});
  }
}
