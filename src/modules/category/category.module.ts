import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Categorty, CategortyRepository, categorySchema } from 'src/models';
import { JwtService } from '@nestjs/jwt';
import { UserMongoModule } from 'src/shared/modules/user.mongo.modules';
import { CategoryFactory } from './factory/category.factory';

@Module({
  imports: [UserMongoModule,
    MongooseModule.forFeature([
      { name: Categorty.name, schema: categorySchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategortyRepository,JwtService,CategoryFactory],
})
export class CategoryModule {}
