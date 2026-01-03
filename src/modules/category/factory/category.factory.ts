import slugify from 'slugify';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../entities/category.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategortyRepository } from 'src/models';

@Injectable()
export class CategoryFactory {
  constructor(private readonly categoryRepo: CategortyRepository) {}

  createCategory(createCategory: CreateCategoryDto, user: any) {
    const category = new Category();
    category.name = createCategory.name;
    category.description = createCategory.description;
    category.slug = slugify(createCategory.name, {
      replacement: '-',
      lower: true,
      trim: true,
    });
    category.createdBy = user._id;
    category.updatedBy = user._id;
    category.isActive = true;
    category.logo = createCategory.logo;
    return category;
  }

  async updateCategory(
    id: string,
    updateCategory: UpdateCategoryDto,
    user: any,
  ) {
    //check if category exist
    const categoryExist = await this.categoryRepo.getOne({ _id: id });
    //fail case
    if (!categoryExist) {
      throw new NotFoundException('Category does not exist');
    }
    const category = new Category();
    const newName = updateCategory.name || categoryExist.name;
    const description = updateCategory.description || categoryExist.description;
    const logo = updateCategory.logo || categoryExist.logo;

    category.name = newName;
    category.description = description;
    category.slug = slugify(newName, {
      replacement: '-',
      lower: true,
      trim: true,
    });
    category.updatedBy = user._id;
    category.logo = logo;
    return category;
  }
}
