import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { UserMongoModule } from 'src/shared/modules/user.mongo.modules';
import { BrandFactory } from './factory/brand.factory';
import { Brand, BrandRepository, brandSchema } from 'src/models';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UserMongoModule,MongooseModule.forFeature([{ name: Brand.name, schema: brandSchema }])],
  controllers: [BrandController],
  providers: [BrandService,BrandFactory,BrandRepository,JwtService],
})
export class BrandModule {}
