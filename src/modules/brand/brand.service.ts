import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandRepository } from 'src/models';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
constructor(private readonly brandRepository: BrandRepository) {}

//_________________________________1- create brand _________________________________//
 async create(brand:Brand) {
  //1- check if brand exist
  const brandExist = await this.brandRepository.exist({slug:brand.slug});  
  //fail case
  if (brandExist) {
    throw new BadRequestException('brand already exist');
  }
  //success case
  return this.brandRepository.create(brand);

  }

  findAll() {
    return `This action returns all brand`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
