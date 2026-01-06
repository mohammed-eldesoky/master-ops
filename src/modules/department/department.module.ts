import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { DepartmentFactory } from './factory/department.factory';
import { Department, DepartmentRepository, departmentSchema } from 'src/models';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Department.name, schema: departmentSchema }])],
  controllers: [DepartmentController],
  providers: [DepartmentService, DepartmentFactory, DepartmentRepository],
})
export class DepartmentModule {}
