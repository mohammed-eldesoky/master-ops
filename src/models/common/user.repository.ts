import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';

export class UserRepository extends AbstractRepository<User> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }
}
