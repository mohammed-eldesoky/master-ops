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

  findAll() {
    return `This action returns all department`;
  }

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
