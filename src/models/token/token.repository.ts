import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { Token } from './token.schema';
import { InjectModel } from '@nestjs/mongoose';

export class TokenRepository extends AbstractRepository<Token> {
  constructor(
    @InjectModel(Token.name) private readonly tokenModel: Model<Token>,
  ) {
    super(tokenModel);
  }
}
