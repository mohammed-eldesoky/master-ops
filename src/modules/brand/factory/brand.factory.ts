import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { Brand } from '../entities/brand.entity';
import slugify from 'slugify';

@Injectable()
export class BrandFactory {
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
}
