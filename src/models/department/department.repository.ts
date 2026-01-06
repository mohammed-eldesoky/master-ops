import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { Department } from './department.schema';
import { InjectModel } from '@nestjs/mongoose';
export class DepartmentRepository extends AbstractRepository<Department> {
  constructor(
    @InjectModel(Department.name)
    private readonly departmentModel: Model<Department>,
  ) {
    super(departmentModel);
  }
}
