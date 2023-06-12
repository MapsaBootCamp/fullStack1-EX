import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './schemas/user.schema';
import { RoadSchema } from './schemas/road.schema';
import { NodeSchema } from './schemas/node.schema';
import { TollStationSchema } from './schemas/tollStation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'owners', schema: UserSchema },
      { name: 'roads', schema: RoadSchema },
      { name: 'nodes', schema: NodeSchema },
      { name: 'tollStations', schema: TollStationSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
