import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@user/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

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
    oldPassword,
  }: Pick<User, '_id' | 'password'> & { oldPassword: string }): Promise<void> {
    const user = await this.userModel.findById(_id);
    if (user) {
      const passwordMatch = await bcrypt.compare(oldPassword, user.password);
      if (passwordMatch) {
        await this.userModel.findByIdAndUpdate(
          _id,
          { $set: { password } },
          { runValidators: true },
        );
      } else {
        throw new BadRequestException('Password is incorrect');
      }
    } else {
      throw new BadRequestException('User does not exist');
    }
  }
}
