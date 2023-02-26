import { BaseSchema } from '@base/base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema({
  id: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class User extends BaseSchema {
  @ApiProperty({
    name: 'name',
    type: String,
    required: true,
    description: 'The name of the user',
  })
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({
    name: 'login',
    type: String,
    required: true,
    description: 'The login of the user',
  })
  @Prop({ type: String, required: true })
  login: string;

  @ApiProperty({
    name: 'password',
    type: String,
    required: true,
    description: 'The hashed password of the user',
  })
  @Prop({
    type: String,
    required: true,
    validate: {
      validator: (v) => v.length >= 6,
      message: 'Password too short',
    },
    set: (v) => {
      if (v.length < 6) return v;
      return bcrypt.hashSync(v, +process.env.BCRYPT_ROUNDS);
    },
  })
  password: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ login: 1 }, { unique: true, background: false });

export { UserSchema };
