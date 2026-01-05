import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UserMongoModule } from 'src/shared/modules/user.mongo.modules';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandModule } from '../brand/brand.module';
import { CategoryModule } from '../category/category.module';
import { Product, ProductRepository, productSchema } from 'src/models';
import { JwtService } from '@nestjs/jwt';
import { ProductFactory } from './factory/product.factory';

@Module({
  imports: [    UserMongoModule,
    MongooseModule.forFeature([{ name: Product.name, schema: productSchema }]),
    BrandModule,
    CategoryModule,],
  controllers: [ProductController],
  providers: [ProductService,JwtService,ProductRepository,ProductFactory],
  exports: [ProductService],
})
export class ProductModule {}
