import { Model } from 'mongoose';
import { Modorator } from './modorator.schema';
import { AbstractRepository } from '../abstract.repository';
import { InjectModel } from '@nestjs/mongoose';

export class ModoratorRepository extends AbstractRepository<Modorator> {
  constructor(
    @InjectModel(Modorator.name)
    private readonly modoratorModel: Model<Modorator>,
  ) {
    super(modoratorModel);
  }
}
