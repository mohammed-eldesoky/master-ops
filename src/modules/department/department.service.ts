import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentRepository } from 'src/models';
import { Department } from './entities/department.entity';
import strict from 'assert/strict';

@Injectable()
export class DepartmentService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  //___________________________1-create department _________________________________//
  async create(department: Department) {
    //check if department already exist
    const existingDepartment = await this.departmentRepository.exist({
      name: department.name,
    });
    //fail case
    if (existingDepartment) {
      throw new ConflictException('Department already exists');
    }
    //success case
    return await this.departmentRepository.create(department);
  }

  //___________________________2-update department _________________________________//
  async update(id: string, department: Department) {
    // check if department already exist
    const existingDepartment = await this.departmentRepository.getOne({
      _id: id,
    });
    if (!existingDepartment) {
      throw new NotFoundException('Department not found');
    }
    // 2- check unique name
    if (department.name && department.name !== existingDepartment.name) {
      const nameExist = await this.departmentRepository.exist({
        name: department.name,
      });

      if (nameExist) {
        throw new BadRequestException('Department name already exists');
      }
    }
    return await this.departmentRepository.update({ _id: id }, department);
  }

  //___________________________3-find one department _________________________________//
  async findOne(id: string) {
    const department = await this.departmentRepository.getOne(
      { _id: id },
      {},
      {
        populate: [
          { path: 'createdBy', select: 'userName id' },
          { path: 'updatedBy', select: 'userName id' },
        ],
      },
    );
    if (!department) {
      throw new NotFoundException('Department not found');
    }
    return department;
  }

  findAll() {
    return `This action returns all department`;
  }

  //___________________________5-delete department _________________________________//
  async remove(id: string) {
    const department = await this.departmentRepository.exist({ _id: id });
    if (!department) {
      throw new NotFoundException('Department not found');
    }
    // delete department
    return await this.departmentRepository.delete({ _id: id });
  }
}
