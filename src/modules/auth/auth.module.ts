import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserMongoModule } from 'src/shared/modules/user.mongo.modules';
import { AuthFactory } from './factory/auth.factory';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenRepository, tokenSchema } from 'src/models';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UserMongoModule,
    MongooseModule.forFeature([{ name: Token.name, schema: tokenSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthFactory, JwtService, TokenRepository],
})
export class AuthModule {}
