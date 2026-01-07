import { ConflictException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeRepository } from 'src/models';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  //___________________________1- Create Employee _________________________________//
  async create(employee: Employee) {
    // check if employee already exists
    const existingEmployee = await this.employeeRepository.exist({
      email: employee.email,
    });
    if (existingEmployee) {
      throw new ConflictException('Employee already exists');
    }
    // success case
    return await this.employeeRepository.create(employee);
  }
  //___________________________2- Update Employee _________________________________//
  async update(id: string, employee: Employee) {
    // check if employee exist
    const existingEmployee = await this.employeeRepository.exist({ _id: id });
    if (!existingEmployee) {
      throw new ConflictException('Employee not found');
    }
    return await this.employeeRepository.update({ _id: id }, employee);
  }

  //___________________________3- Find One Employee _________________________________//
  findOne(id: string) {
    // check if employee exist
    const existingEmployee = this.employeeRepository.exist(
      { _id: id },
      {},
      {
        populate: [
          { path: 'createdBy', select: 'userName id' },
          { path: 'updatedBy', select: 'userName id' },
        ],
      },
    );
    if (!existingEmployee) {
      throw new ConflictException('Employee not found');
    }
    return existingEmployee;
  }

  //___________________________4- Find All Employee _________________________________//
  findAll() {
    return `This action returns all employee`;
  }
//___________________________5- Remove Employee _________________________________//
  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
