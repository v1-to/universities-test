import { BaseSchema } from '@base/base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  id: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class User extends BaseSchema {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  login: string;

  @Prop({
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        if (v.length < 6) throw new Error();
      },
      message: 'Password too short',
    },
  })
  password: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export { UserSchema };
