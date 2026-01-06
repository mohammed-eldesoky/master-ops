import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { Department } from '../entities/department.entity';

@Injectable()
export class DepartmentFactory {
  constructor() {}
  //________________1-create department _________________//
  createDepartment(createDepartmentDto: CreateDepartmentDto, user: any) {
    const department = new Department();
    department.name = createDepartmentDto.name;
    department.description = createDepartmentDto.description;
    department.isActive = true;
    department.createdBy = user._id;
    department.updatedBy = user._id;
    return department;
  }
}
