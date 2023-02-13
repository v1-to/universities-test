import { Prop } from '@nestjs/mongoose';
import { Schema } from 'mongoose';

export abstract class BaseSchema {
  @Prop({ type: Schema.Types.ObjectId })
  _id: string;
}
