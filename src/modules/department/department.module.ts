import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { DepartmentFactory } from './factory/department.factory';
import { Department, DepartmentRepository, departmentSchema } from 'src/models';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserMongoModule } from 'src/shared/modules/user.mongo.modules';

@Module({
  imports: [UserMongoModule,MongooseModule.forFeature([{ name: Department.name, schema: departmentSchema }])],
  controllers: [DepartmentController],
  providers: [DepartmentService, DepartmentFactory, DepartmentRepository,JwtService],
})
export class DepartmentModule {}
