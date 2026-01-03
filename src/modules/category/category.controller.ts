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
@Auth(['Admin', 'Modorator'])
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryFactory: CategoryFactory,
  ) {}
  //_______________________________1- create category _____________________________//
  @Post()
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

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
