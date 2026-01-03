import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Auth, messages, User } from 'src/common';
import { CategoryFactory } from './factory/category.factory';

@Controller('category')

export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryFactory: CategoryFactory,
  ) {}
  //_______________________________1- create category _____________________________//
  @Post()
  @Auth(['Admin', 'Modorator'])
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @User() user: any,
  ) {
    const category = await this.categoryFactory.createCategory(
      createCategoryDto,
      user,
    );
    const data = await this.categoryService.create(category);
    return {
      message: messages.category.created,
      success: true,
      data: data,
    };
  }
  //_______________________________2- update category _____________________________//
@Auth(['Admin', 'Modorator'])
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @User() user: any,
  ) {
    const category = await this.categoryFactory.updateCategory(
      id,
      updateCategoryDto,
      user,
    );

    const data = await this.categoryService.update(id, category);
    return {
      message: messages.category.updated,
      success: true,
      data: data,
    };
  }
  //_______________________________3- get specific category _____________________________//

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data =  await this.categoryService.getCategory(id);
    return {
      message: messages.category.fetched,
      success: true,
      data: data,
    };
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
  //_______________________________5- delete category _____________________________//
  @Delete(':id')
  @Auth(['Admin', 'Modorator'])
 async remove(@Param('id') id: string) {
  await this.categoryService.deleteCategory(id);
    return {
      message: messages.category.deleted,
      success: true
    };
  }
}
