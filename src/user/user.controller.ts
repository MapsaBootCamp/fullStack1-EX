import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';

import { ParseObjectIdPipe } from 'src/pipes/parse-objectid.pipe';
import { CreateCarDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { CarType, UserDocument } from './schemas/user.schema';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/car/:id/')
  async addCarToOwner(
    @Param('id', ParseObjectIdPipe) ownerId: ObjectId,
    @Body() body: CreateCarDto,
  ): Promise<UserDocument> {
    const owner = await this.userService.findUserById(ownerId);
    if (owner) {
      return await this.userService.addCarToOwner(ownerId, body);
    } else {
      throw new BadRequestException('Owner does not exist');
    }
  }

  @Get('/car/')
  async getCars(
    @Query(
      'color',
      new ParseArrayPipe({
        optional: true,
      }),
    )
    color: string[],
    @Query('minAge') minAge: number,
    @Query('max-road-width') maxRoadWidth: number,
    @Query('car-type') carType: CarType,
  ): Promise<UserDocument[]> {
    if (color) {
      return await this.userService.findCarsByColor(color);
    } else if (minAge) {
      return await this.userService.findCarsByMinAge(minAge);
    } else if (maxRoadWidth && carType) {
      return await this.userService.findCarWithMaxRoadWidth(
        maxRoadWidth,
        carType,
      );
    } else {
      return await this.userService.findAllCars();
    }
  }
}
