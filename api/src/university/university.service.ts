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

export type UpdateUniversityData = Partial<
  Pick<University, 'web_pages' | 'name' | 'domains'>
>;

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

  async updateUniversity(
    id: string,
    { name, web_pages, domains }: UpdateUniversityData,
  ): Promise<University> {
    return this.universityModel.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...(web_pages && { web_pages }),
        ...(domains && { domains }),
      },
      { new: true },
    );
  }

  async deleteUniversity(id: string): Promise<void> {
    return this.universityModel.findByIdAndDelete(id);
  }
}
