import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TollStationDocument = HydratedDocument<TollStation>;

@Schema({ timestamps: false })
export class TollStation {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  toll_per_cross: number;

  @Prop(
    raw({
      type: { type: String },
      coordinates: { type: Array },
    }),
  )
  location: Record<string, any>;

  // @Prop()
  // temp: string;
}

export const TollStationSchema = SchemaFactory.createForClass(TollStation);
