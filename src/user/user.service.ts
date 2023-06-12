import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import * as turf from '@turf/turf';

import { CarType, User, UserDocument } from './schemas/user.schema';
import { RegisterDto } from 'src/auth/dtos/auth.dto';
import { CreateCarDto } from './dtos/user.dto';
import { Road } from './schemas/road.schema';
import { TollStation } from './schemas/tollStation.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('owners') private readonly userModel: Model<User>,
    @InjectModel('nodes') private readonly nodeModel: Model<Node>,
    @InjectModel('roads') private readonly roadModel: Model<Road>,
    @InjectModel('tollStations')
    private readonly tollStationModel: Model<TollStation>,
  ) {}

  async checkUserByMobile(mobile: string): Promise<{ _id: Types.ObjectId }> {
    return await this.userModel.exists({
      mobile,
    });
  }

  async findUserById(_id: ObjectId): Promise<UserDocument> {
    return await this.userModel.findById(_id);
  }

  async findUserByMobile(mobile: string): Promise<UserDocument> {
    return await this.userModel.findOne({
      mobile,
    });
  }

  async createNewUser(body: RegisterDto): Promise<UserDocument> {
    return await this.userModel.create(body);
  }

  async addCarToOwner(id: ObjectId, body: CreateCarDto): Promise<UserDocument> {
    return await this.userModel.findByIdAndUpdate(id, {
      $push: {
        ownerCar: body,
      },
    });
  }

  async findAllCars(): Promise<UserDocument[]> {
    return await this.userModel.aggregate([
      {
        $unwind: '$ownerCar',
      },
      {
        $project: {
          _id: false,
          ownerCar: true,
        },
      },
    ]);
  }

  async findCarsByColor(color: any): Promise<UserDocument[]> {
    return await this.userModel.aggregate([
      {
        $unwind: '$ownerCar',
      },
      {
        $match: {
          'ownerCar.color': { $in: color },
        },
      },
      {
        $project: {
          _id: false,
          ownerCar: true,
        },
      },
    ]);
  }

  async findCarsByMinAge(minAge: number): Promise<UserDocument[]> {
    return await this.userModel.aggregate([
      {
        $match: {
          age: { $gte: minAge },
        },
      },
      {
        $unwind: '$ownerCar',
      },
      {
        $project: {
          // _id: false,
          name: true,
          age: true,
          ownerCar: true,
        },
      },
    ]);
  }

  async findCarWithMaxRoadWidth(
    maxRoadWidth: number,
    carType: CarType,
  ): Promise<UserDocument[] | any> {
    // return await this.userModel.aggregate([
    //   {
    //     $unwind: '$ownerCar',
    //   },
    //   {
    //     $match: {
    //       'ownerCar.type': carType,
    //     },
    //   },
    //   // {
    //   //   $project: {
    //   //     _id: false,
    //   //     ownerCar: true,
    //   //   },
    //   // },
    //   {
    //     $lookup: {
    //       from: 'nodes',
    //       localField: 'ownerCar.id',
    //       foreignField: 'car',
    //       as: 'nodes_car',
    //     },
    //   },
    // ]);

    // const road = await this.roadModel.findById('6487331947a04b0955401ecf');
    const node = await this.nodeModel.findById('6482e6833b3bcd7d0f8e458d');

    return node;
    // return node.get('location');
  }

  // async standardizeRoads() {
  //   const roads = await this.roadModel.find();
  //   for (const road of roads) {
  //     await this.roadModel.findByIdAndUpdate(road._id.toString(), {
  //       $set: {
  //         // temp: road.geom,
  //         geom: this.toMultiLineStringObject(road.temp),
  //       },
  //       $unset: {
  //         // geom: true,
  //         temp: true,
  //       },
  //     });
  //   }
  //   return roads;
  // }

  // async standardizeTollStations() {
  //   const tollStations = await this.tollStationModel.find({});

  //   for (const tollStation of tollStations) {
  //     await this.tollStationModel.findByIdAndUpdate(
  //       tollStation._id.toString(),
  //       {
  //         $set: {
  //           // temp: tollStation.location,
  //           location: this.toPointObject(tollStation.temp),
  //         },
  //         $unset: {
  //           // location: true,
  //           temp: true,
  //         },
  //       },
  //     );
  //   }
  // }

  // async standardizeNodes() {
  //   const nodes = await this.nodeModel.find({});

  //   for (const node of nodes) {
  //     await this.nodeModel.findByIdAndUpdate(node._id.toString(), {
  //       $set: {
  //         // temp: node.get('location'),
  //         // location: this.toPointObject(node.get('temp')),
  //         // temp: node.get('date'),
  //         date: new Date(node.get('temp')),
  //       },
  //       $unset: {
  //         // location: true,
  //         // date: true,
  //         temp: true,
  //       },
  //     });
  //   }
  // }

  toMultiLineStringObject(multiLineString: string): turf.MultiLineString {
    const coords = multiLineString
      .split('MULTILINESTRING ')[1]
      .slice(2, -2)
      .split(', ')
      .map((value) => value.split(' ').map((value) => parseFloat(value)));

    return turf.geometry('MultiLineString', [coords]) as turf.MultiLineString;
  }

  toPointObject(point: string): turf.Point {
    const coord = point
      .split('POINT ')[1]
      .slice(1, -1)
      .split(' ')
      .map((value) => parseFloat(value));

    return turf.geometry('Point', coord) as turf.Point;
  }
}
