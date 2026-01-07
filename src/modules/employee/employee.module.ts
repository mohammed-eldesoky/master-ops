import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { EmployeeFactory } from './factory/employee.factory';
import { Employee, EmployeeRepository, EmployeeSchema } from 'src/models';
import { UserMongoModule } from 'src/shared/modules/user.mongo.modules';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UserMongoModule,
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeFactory, EmployeeRepository,JwtService],
})
export class EmployeeModule {}
