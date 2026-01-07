import { EMPLOYEE_ROLE, EMPLOYEE_STATUS } from 'src/common';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { Employee } from '../entities/employee.entity';
import { Types } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { EmployeeRepository } from 'src/models';
@Injectable()
export class EmployeeFactory {
  constructor(private readonly employeeRepository: EmployeeRepository) {}
  //________________ Create Employee _________________//
  create(createEmployeeDto: CreateEmployeeDto, user: any) {
    const employee = new Employee();
    //________________ Basic Info _________________//
    employee.fullName = createEmployeeDto.fullName;
    employee.email = createEmployeeDto.email;
    employee.phone = createEmployeeDto.phone;

    //________________ Job Info _________________//
    employee.departmentId = new Types.ObjectId(createEmployeeDto.departmentId);
    employee.jobTitle = createEmployeeDto.jobTitle;

    employee.role = createEmployeeDto.role || EMPLOYEE_ROLE.EMPLOYEE;

    employee.status = EMPLOYEE_STATUS.ACTIVE;

    employee.hireDate = new Date();

    employee.terminationDate = undefined;

    //________________ System Fields _________________//
    employee.isActive = true;
    employee.createdBy = user._id;
    employee.updatedBy = user._id;

    return employee;
  }

  //________________ Update Employee _________________//
  async update(id: string, updateEmployeeDto: UpdateEmployeeDto, user: any) {
    //check if employee exist
    const employeeExist = await this.employeeRepository.exist({ _id: id });
    if (!employeeExist) {
      throw new NotFoundException('Employee not found');
    }
    const employee = new Employee();
    const newName = updateEmployeeDto.fullName || employeeExist.fullName;
    const newEmail = updateEmployeeDto.email || employeeExist.email;
    const newPhone = updateEmployeeDto.phone || employeeExist.phone;
    const newDepartmentId =
      updateEmployeeDto.departmentId || employeeExist.departmentId;
    const newJobTitle = updateEmployeeDto.jobTitle || employeeExist.jobTitle;
    const newRole = updateEmployeeDto.role || employeeExist.role;

    employee.fullName = newName;
    employee.email = newEmail;
    employee.phone = newPhone;
    employee.departmentId = newDepartmentId;
    employee.jobTitle = newJobTitle;
    employee.role = newRole;

    employee.updatedBy = user._id;
    return employee;
  }
  
}
