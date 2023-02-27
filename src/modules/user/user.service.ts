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

  async insertResource(resource: User): Promise<Omit<User, 'password'>> {
    const { password, ...user } = (
      await this.userModel.create(resource)
    ).toObject();
    return user;
  }

  async findResourceByLogin({ login }: Pick<User, 'login'>): Promise<User> {
    return (await this.userModel.findOne({ login })).toObject();
  }

  async changePassword({
    _id,
    password,
  }: Pick<User, '_id' | 'password'>): Promise<void> {
    await this.userModel.findByIdAndUpdate(_id, { $set: { password } });
  }
}
