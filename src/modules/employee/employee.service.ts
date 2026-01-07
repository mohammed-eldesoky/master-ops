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

  findAll() {
    return `This action returns all employee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
