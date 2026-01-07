import { EMPLOYEE_ROLE, EMPLOYEE_STATUS } from 'src/common';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { Employee } from '../entities/employee.entity';
import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
@Injectable()
export class EmployeeFactory {
  constructor() {}
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
}
