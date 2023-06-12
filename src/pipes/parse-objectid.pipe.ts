import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, Types.ObjectId> {
  transform(value: any): any {
    // const validObjectId = Types.ObjectId.isValid(value);
    // if (!validObjectId) {
    //   throw new BadRequestException('Invalid Mongo ObjectId');
    // }
    try {
      return Types.ObjectId.createFromHexString(value);
    } catch (error) {
      throw new BadRequestException('Invalid Mongo ObjectId');
    }
  }
}
