import slugify from 'slugify';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../entities/category.entity';

export class CategoryFactory {
  constructor() {}

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
}
