import { Schema } from 'mongoose';

export abstract class BaseSchema {
  _id: Schema.Types.ObjectId;
}
