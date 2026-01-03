import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategortyRepository } from 'src/models';
import { Category } from './entities/category.entity';
import strict from 'assert/strict';
import { User } from 'src/common';
import { GetCategoriesQueryDto } from './dto/get.category-Dto';
import { asyncWrapProviders } from 'async_hooks';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategortyRepository) {}
  //_______________________________1- create category _____________________________//
  async create(category: Category) {
    //check if category already exist
    const categoryExist = await this.categoryRepository.exist({
      slug: category.slug,
    });
    //fail case
    if (categoryExist) {
      throw new BadRequestException('Category already exist');
    }
    //success case
    return await this.categoryRepository.create(category);
  }

  //_______________________________2- update category _____________________________//
  async update(id: string, category: Category) {
    //check if category exist
    const categoryExist = await this.categoryRepository.getOne({ _id: id });
    //fail case
    if (!categoryExist) {
      throw new BadRequestException('Category does not exist');
    }
    //success case
    return await this.categoryRepository.update({ _id: id }, category);
  }

  //_______________________________3- get specific category _____________________________//
  async getCategory(id: string) {
    //check if category exist
    const categoryExist = await this.categoryRepository.getOne(
      { _id: id },
      {},
      {
        populate: [
          { path: 'createdBy', select: 'userName id' },
          { path: 'updatedBy', select: 'userName id' },
        ],
      },
    );
    //fail case
    if (!categoryExist) {
      throw new BadRequestException('Category does not exist');
    }
    //success case
    return categoryExist;
  }
  //_______________________________4- get all category _____________________________//
  async findAll(QUERY: GetCategoriesQueryDto) {
    const {
      page = 1,
      limit = 10,
      sort = '-createdAt',
      isActive,
      search,
    } = QUERY;
    //pagination
    const skip = (page - 1) * limit;
    //filter
    const filter: any = {};
    if (isActive !== undefined) {
      filter.isActive = isActive;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    // options
    const options = {
      skip,
      limit,
      sort,
      populate: [
        { path: 'createdBy', select: 'name email -_id' },
        { path: 'updatedBy', select: 'name email -_id' },
      ],
    };

    const [categories, total] = await Promise.all([
    this.categoryRepository.getAll(filter, {}, options),
    this.categoryRepository.countDocuments(filter),
  ]);
    //success case
    return {
      data: categories,
      pagination: {
        page,
        limit,
        total,
        totalPage: Math.ceil(total / limit),
      },
    };
  }
  //_______________________________5- delete category _____________________________//
  async deleteCategory(id: string) {
    //check if category exist
    const categoryExist = await this.categoryRepository.getOne({ _id: id });
    //fail case
    if (!categoryExist) {
      throw new BadRequestException('Category does not exist');
    }
    //success case
    return await this.categoryRepository.delete({ _id: id });
  }
}
