import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { Brand } from './brand.schema';
import { InjectModel } from '@nestjs/mongoose';

export class BrandRepository extends AbstractRepository<Brand> {
  constructor(
    @InjectModel(Brand.name) private readonly brandModel: Model<Brand>,
  ) {
    super(brandModel);
  }
}
