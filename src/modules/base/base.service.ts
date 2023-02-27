import { FilterQuery, Model } from 'mongoose';

export type ListParams = {
  page: number;
  [x: string]: string | number;
};

export abstract class BaseService<T> {
  readonly fieldsShownInResourceListing: string[] = [];

  constructor(public readonly resourceModel: Model<T>) {}

  async listResource({ page, ...filters }: ListParams): Promise<T[]> {
    return this.resourceModel.find(
      { ...filters } as FilterQuery<T>,
      this.fieldsShownInResourceListing.join(' ') ?? null,
      {
        limit: 20,
        ...(page && { skip: 20 * page }),
      },
    );
  }

  async findResourceById({ id }: { id: string }): Promise<T> {
    return this.resourceModel.findById(id);
  }

  async insertResource(resource: T): Promise<T> {
    return this.resourceModel.create(resource);
  }

  async updateResource(id: string, resource: Partial<T>): Promise<T> {
    return this.resourceModel.findByIdAndUpdate(id, resource, {
      new: true,
      runValidators: true,
    });
  }

  async deleteResource(id: string): Promise<void> {
    return this.resourceModel.findByIdAndDelete(id);
  }
}
