import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { University, UniversityDocument } from '@university/university.schema';
import { Model } from 'mongoose';

export type ListUniversitiesParams = {
  country: string;
  page: number;
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
}
