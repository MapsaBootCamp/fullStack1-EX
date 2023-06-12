import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NodeDocument = HydratedDocument<Node>;

@Schema({ timestamps: false })
export class Node {
  @Prop({
    required: true,
  })
  car: number;

  @Prop(
    raw({
      type: { type: String },
      coordinates: { type: Array },
    }),
  )
  location: Record<string, any>;

  @Prop({
    required: true,
  })
  date: Date;

  // @Prop()
  // temp: string;
}

export const NodeSchema = SchemaFactory.createForClass(Node);
