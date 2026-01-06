import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { Department } from '../entities/department.entity';
import { UpdateDepartmentDto } from '../dto/update-department.dto';
import { DepartmentRepository } from 'src/models';

@Injectable()
export class DepartmentFactory {
  constructor(private readonly departmentRepository: DepartmentRepository) {}
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
  //_________________2-update department _____________________//
  async updateDepartment(
    id: string,
    updateDepartmentDto: UpdateDepartmentDto,
    user: any,
  ) {
    // check if department already exist
    const existingDepartment = await this.departmentRepository.getOne({
      _id: id,
    });
    if (!existingDepartment) {
      throw new ConflictException('Department not found');
    }
    const department = new Department();
    const newName = updateDepartmentDto.name || existingDepartment.name;
    const description =
      updateDepartmentDto.description || existingDepartment.description;
    department.name = newName;
    department.description = description;
    department.updatedBy = user._id;
    return department;
  }
}
