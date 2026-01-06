import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentRepository } from 'src/models';
import { Department } from './entities/department.entity';

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
      throw new BadRequestException('Department already exists');
    }
    //success case
    return await this.departmentRepository.create(department);
  }

  findAll() {
    return `This action returns all department`;
  }

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
