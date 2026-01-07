import { ConflictException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeRepository } from 'src/models';
import { Employee } from './entities/employee.entity';
import { GetEmployeeQueryDto } from './dto/get-query-dto';
import { EMPLOYEE_ROLE } from 'src/common';
import { AddEmployeeRoleDto, RemoveEmployeeRoleDto } from './dto/role.dto';

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
  async findAll(QUERY: GetEmployeeQueryDto) {
    const {
      page = 1,
      limit = 10,
      sort = '-createdAt',
      isActive,
      search,
    } = QUERY;
    //pagination
    const skip = (page - 1) * limit;
    //filter
    const filter: any = {};
    if (isActive !== undefined) {
      filter.isActive = isActive;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    // options
    const options = {
      skip,
      limit,
      sort,
      populate: [
        { path: 'createdBy', select: 'userName _id' },
        { path: 'updatedBy', select: 'userName _id' },
      ],
    };

    const [employee, total] = await Promise.all([
      this.employeeRepository.getAll(filter, {}, options),
      this.employeeRepository.countDocuments(filter),
    ]);
    //success case
    return {
      data: employee,
      pagination: {
        page,
        limit,
        total,
        totalPage: Math.ceil(total / limit),
      },
    };
  }
  //___________________________5- Remove Employee _________________________________//
  async remove(id: string) {
    // check if employee exist
    const existingEmployee = await this.employeeRepository.exist({ _id: id });
    if (!existingEmployee) {
      throw new ConflictException('Employee not found');
    }
    return await this.employeeRepository.delete({ _id: id });
  }
  //___________________________6- Add Employee Role _________________________________//
  async addRole(id: string, addEmployeeRoleDto: AddEmployeeRoleDto, user: any) {
    // check if employee exist
    const existingEmployee = await this.employeeRepository.exist({ _id: id });
    if (!existingEmployee) {
      throw new ConflictException('Employee not found');
    }
    existingEmployee.role = addEmployeeRoleDto.role;
    existingEmployee.updatedBy = user._id;
    return await this.employeeRepository.update({ _id: id }, existingEmployee);
  }
  //___________________________7- Remove Employee Role _________________________________//
  async removeRole(
    id: string,
    user: any,
  ) {
    // check if employee exist
    const existingEmployee = await this.employeeRepository.exist({ _id: id });
    if (!existingEmployee) {
      throw new ConflictException('Employee not found');
    }
    existingEmployee.role = EMPLOYEE_ROLE.EMPLOYEE;
    existingEmployee.updatedBy = user._id;
    return await this.employeeRepository.update({ _id: id }, existingEmployee);
  }
}
