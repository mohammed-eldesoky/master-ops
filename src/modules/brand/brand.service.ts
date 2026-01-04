import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandRepository } from 'src/models';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}

  //_________________________________1- create brand _________________________________//
  async create(brand: Brand) {
    //1- check if brand exist
    const brandExist = await this.brandRepository.exist({ slug: brand.slug });
    //fail case
    if (brandExist) {
      throw new BadRequestException('brand already exist');
    }
    //success case
    return this.brandRepository.create(brand);
  }

  //_________________________________2- update brand _________________________________//
  async update(id: string, brand: Brand) {
    //1- check if brand exist
    const brandExist = await this.brandRepository.exist({ slug: brand.slug });
    //fail case
    if (brandExist) {
      throw new BadRequestException('brand already exist');
    }
    //success case
    return await this.brandRepository.update({ _id: id }, brand);
  }

  //_________________________________3- get specific brand _________________________________//
  async findOne(id: string) {
    //check if brand exist
    const brandExist = await this.brandRepository.exist(
      { _id: id },
      {},
      {
        populate: [
          { path: 'createdBy', select: 'userName _id' },
          { path: 'updatedBy', select: 'userName  _id' },
        ],
      },
    );
    //fail case
    if (!brandExist) {
      throw new BadRequestException('brand does not exist');
    }
    //success case
    return brandExist;
  }

  //_________________________________4- get all brand _________________________________//
  findAll() {
    return `This action returns all brand`;
  }

  //_________________________________5- delete brand _________________________________//
 async remove(id: string) {
  //check if brand exist
  const brandExist = await this.brandRepository.exist({ _id: id });
  //fail case
  if (!brandExist) {
    throw new BadRequestException('brand does not exist');
  }
  //success case
  return await this.brandRepository.delete({ _id: id });
  }
}
