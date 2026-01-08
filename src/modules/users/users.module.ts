import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { User, UserRepository, userSchema } from 'src/models';
import { JwtService } from '@nestjs/jwt';
import { UserMongoModule } from 'src/shared/modules/user.mongo.modules';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UserMongoModule,MongooseModule.forFeature([{ name: User.name, schema: userSchema }])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository,JwtService],
})
export class UsersModule {}
