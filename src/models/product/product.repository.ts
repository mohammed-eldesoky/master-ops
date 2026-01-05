import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { Product } from './product.schema';
import { InjectModel } from '@nestjs/mongoose';

export class ProductRepository extends AbstractRepository<Product> {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {
    super(productModel);
  }
}
