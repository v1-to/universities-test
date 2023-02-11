import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ id: false })
export class University {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  alpha_two_code: string;

  @Prop({ type: String })
  country: string;

  @Prop({ type: [String] })
  domains: string[];

  @Prop({ type: String })
  'state-province'?: string;

  @Prop({ type: [String] })
  web_pages: string[];
}
