import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { Admin } from './admin.schema';
import { InjectModel } from '@nestjs/mongoose';

export class AdminRepository extends AbstractRepository<Admin> {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
  ) {
    super(adminModel);
  }
}
