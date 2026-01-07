import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';

import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './employee.schema';

export class EmployeeRepository extends AbstractRepository<Employee> {
  constructor(
    @InjectModel(Employee.name) private readonly employeeModel: Model<Employee>,
  ) {
    super(employeeModel);
  }
}
