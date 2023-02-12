import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UniversityDocument = HydratedDocument<University>;

@Schema({ id: false })
export class University {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        if (v.length != 2) throw new Error();
      },
      message: 'Invalid Alpha Two Code value',
    },
    set: (v) => String(v).toUpperCase(),
  })
  alpha_two_code: string;

  @Prop({ type: String, required: true })
  country: string;

  @Prop({ type: [String], required: true })
  domains: string[];

  @Prop({ type: String })
  'state-province'?: string;

  @Prop({ type: [String], required: true })
  web_pages: string[];
}

const UniversitySchema = SchemaFactory.createForClass(University);

UniversitySchema.index(
  { name: 1, 'state-province': 1, country: 1 },
  { unique: true },
);

export { UniversitySchema };
