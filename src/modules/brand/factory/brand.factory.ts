import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { Brand } from '../entities/brand.entity';
import slugify from 'slugify';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { BrandRepository } from 'src/models';

@Injectable()
export class BrandFactory {
  constructor(private readonly brandRepo: BrandRepository) {}

  createBrand(brandDto: CreateBrandDto, user: any) {
    const brand = new Brand();
    brand.name = brandDto.name;
    brand.slug = slugify(brandDto.name, {
      replacement: '-',
      lower: true,
      trim: true,
    });
    brand.createdBy = user._id;
    brand.updatedBy = user._id;
    brand.isActive = true;
    brand.description = brandDto.description;
    brand.logo = brandDto.logo;

    return brand;
  }
  async updateBrannd(updateBrandDto: UpdateBrandDto, user: any, id: string) {
    //check if brand exist
    const brandExist = await this.brandRepo.getOne({ _id: id });
    //fail case
    if (!brandExist) {
      throw new NotFoundException('Brand does not exist');
    }
    const brand = new Brand();
    const newName = updateBrandDto.name || brandExist.name;
    const description = updateBrandDto.description || brandExist.description;
    const logo = updateBrandDto.logo || brandExist.logo;

    brand.name = newName;
    brand.slug = slugify(newName, {
      replacement: '-',
      lower: true,
      trim: true,
    });
    brand.updatedBy = user._id;
    brand.description = description;
    brand.logo = logo;
    return brand;
  }
}
