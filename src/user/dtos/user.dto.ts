import { IsEnum, IsNumber, IsString } from 'class-validator';

import { CarType } from '../schemas/user.schema';

export class CreateCarDto {
  @IsNumber()
  id: number;

  @IsEnum(CarType)
  type: CarType;

  @IsString()
  color: string;

  @IsNumber()
  length: number;

  @IsNumber()
  load_volume: number;
}
