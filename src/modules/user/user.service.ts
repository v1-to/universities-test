import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@user/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async insertResource(resource: User): Promise<User> {
    return this.userModel.create(resource);
  }

  async findResourceByLogin({ login }: Pick<User, 'login'>): Promise<User> {
    return this.userModel.findOne({ login });
  }
}
