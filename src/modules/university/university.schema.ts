import { BaseSchema } from '@base/base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type UniversityDocument = HydratedDocument<University>;

@Schema({
  id: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class University extends BaseSchema {
  @ApiProperty({
    name: 'name',
    type: String,
    required: true,
    description: 'The name of the university',
  })
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({
    name: 'alpha_two_code',
    type: String,
    required: true,
    description: 'The alpha_two_code where the university is located',
  })
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

  @ApiProperty({
    name: 'country',
    type: String,
    required: true,
    description: 'The country where the university is located',
  })
  @Prop({ type: String, required: true })
  country: string;

  @ApiProperty({
    name: 'domains',
    type: String,
    isArray: true,
    required: true,
    description: 'The web domains of university',
  })
  @Prop({ type: [String], required: true })
  domains: string[];

  @ApiProperty({
    name: 'state-province',
    type: String,
    required: false,
    description: 'The state-province where the university is located',
  })
  @Prop({ type: String })
  'state-province'?: string;

  @ApiProperty({
    name: 'web_pages',
    type: String,
    isArray: true,
    required: true,
    description: 'The web pages of university',
  })
  @Prop({ type: [String], required: true })
  web_pages: string[];
}

const UniversitySchema = SchemaFactory.createForClass(University);

UniversitySchema.index(
  { name: 1, 'state-province': 1, country: 1 },
  { unique: true, background: false },
);

export { UniversitySchema };
