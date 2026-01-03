import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategortyRepository } from 'src/models';
import { Category } from './entities/category.entity';

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
async  update(id: string, category:Category) {
//check if category exist
    const categoryExist =await this.categoryRepository.getOne({ _id: id });
    //fail case
    if (!categoryExist) {
      throw new BadRequestException('Category does not exist');
    }
    //success case
  return await this.categoryRepository.update({ _id: id }, category);
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }



  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
