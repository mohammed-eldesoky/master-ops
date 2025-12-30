import {
  Model,
  MongooseUpdateQueryOptions,
  ObjectId,
  ProjectionType,
  QueryFilter,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

//________________________________ Abstract Repository ___________________________//

export class AbstractRepository<T> {
  constructor(private readonly model: Model<T>) {}

  //______________________1- Create Document ______________________//
  async create(item: Partial<T>) {
    const doc = new this.model(item);
    return await doc.save();
  }
  //______________________2- get one Document ______________________//

  async getOne(
    filter: QueryFilter<T>,
    projection?: ProjectionType<T>,
    option?: QueryOptions<T>,
  ) {
    return await this.model.findOne(filter, projection, option);
  }
  //______________________3- get all Documents ______________________//
  async getAll(
    filter: QueryFilter<T>,
    projection?: ProjectionType<T>,
    option?: QueryOptions<T>,
  ) {
    return await this.model.find(filter, projection, option);
  }

  //______________________4- exist Document ______________________//
  async exist(
    filter: QueryFilter<T>,
    projection?: ProjectionType<T>,
    option?: QueryOptions<T>,
  ) {
    return await this.model.findOne(filter, projection, option);
  }

  //______________________5- update Document ______________________//
  async update(
    filter: QueryFilter<T>,
    update?: UpdateQuery<T>,
    options?: QueryOptions<T> & {
      includeResultMetadata: true;
      lean: true;
    },
  ) {
    return await this.model.findOneAndUpdate(filter, update, options);
  }

  //______________________6- delete Document ______________________//
  async delete(
    filter: QueryFilter<T>,
    options?: QueryOptions<T>,
  ): Promise<any> {
    return await this.model.deleteOne(filter);
  }
  //______________________7- get Document ______________________//
  public async findById(id: string | ObjectId, projection?: ProjectionType<T>) {
    return this.model.findById(id, projection);
  }
  //______________________8- update many Document ______________________//
  public async updateMany(
    filter: QueryFilter<T>,
    update: UpdateQuery<T>,
    option?: MongooseUpdateQueryOptions<T>,
  ) {
    return this.model.updateMany(filter, update, option);
  }
  //______________________9- delete many Document ______________________//
  async deleteMany(filter: QueryFilter<T>): Promise<any> {
    return this.model.deleteMany(filter);
  }
  //______________________10- count Document ______________________//
  async countDocuments(filter: QueryFilter<T>) {
    return await this.model.countDocuments(filter);
  }
}
