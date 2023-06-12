import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum Role {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
  CUSTOMER = 'CUSTOMER',
}

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum CarType {
  BIG = 'big',
  SMALL = 'small',
}

@Schema({ _id: false })
class Car {
  @Prop()
  id: number;

  @Prop({
    enum: CarType,
    required: true,
  })
  type: CarType;

  @Prop({
    required: true,
  })
  color: string;

  @Prop({
    required: true,
  })
  length: number;

  @Prop()
  load_volume: number;
}

@Schema({ timestamps: true })
export class User {
  @Prop({
    trim: true,
    unique: true,
    match: /^09[0-9]{9}$/,
    sparse: true,
  })
  mobile: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
  })
  national_code: number;

  @Prop({
    required: true,
  })
  age: number;

  @Prop({
    default: 0,
  })
  total_toll_paid: number;

  @Prop({
    enum: Role,
    default: Role.CUSTOMER,
  })
  role: Role;

  @Prop({
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @Prop([Car])
  ownerCar: Car[];
}

export const UserSchema = SchemaFactory.createForClass(User);
