import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoadDocument = HydratedDocument<Road>;

@Schema({ timestamps: false })
export class Road {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  width: number;

  @Prop(
    raw({
      type: { type: String },
      coordinates: { type: Array },
    }),
  )
  geom: Record<string, any>;

  // @Prop()
  // temp: string;
}

export const RoadSchema = SchemaFactory.createForClass(Road);
