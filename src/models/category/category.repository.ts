import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { Categorty } from './category.schema';
import { InjectModel } from '@nestjs/mongoose';

export class CategortyRepository extends AbstractRepository<Categorty> {
  constructor(
    @InjectModel(Categorty.name)
    private readonly categoryModel: Model<Categorty>,
  ) {
    super(categoryModel);
  }
}
