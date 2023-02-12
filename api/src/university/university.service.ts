import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { University, UniversityDocument } from '@university/university.schema';
import { Model } from 'mongoose';

export type ListUniversitiesParams = {
  country: string;
  page: number;
};

export type FindUniversityByIdParams = {
  id: string;
};

@Injectable()
export class UniversityService {
  constructor(
    @InjectModel(University.name)
    private universityModel: Model<UniversityDocument>,
  ) {}

  async listUniversities({
    country,
    page,
  }: ListUniversitiesParams): Promise<University[]> {
    return this.universityModel.find(
      {
        ...(country && { country }),
      },
      'name country state-province',
      {
        limit: 20,
        ...(page && { skip: 20 * page }),
      },
    );
  }

  async findUniversityById({
    id,
  }: FindUniversityByIdParams): Promise<University> {
    return this.universityModel.findById(id);
  }

  async insertUniversity(university: University): Promise<University> {
    return this.universityModel.create(university);
  }
}
