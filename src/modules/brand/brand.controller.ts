import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Auth, messages, User } from 'src/common';
import { BrandFactory } from './factory/brand.factory';
import { GetBrandQueryDto } from './dto/get.brand-query';

@Controller('brand')
export class BrandController {
  constructor(
    private readonly brandService: BrandService,
    private readonly brandFactory: BrandFactory,
  ) {}
  //_________________________________1- create brand _________________________________//
  @Post('/create')
  @Auth(['Admin', 'Modorator'])
  async create(@Body() createBrandDto: CreateBrandDto, @User() user: any) {
    const brand = this.brandFactory.createBrand(createBrandDto, user);
    const data = await this.brandService.create(brand);
    return {
      message: messages.brand.created,
      success: true,
      data: data,
    };
  }
  //_________________________________2- update brand _________________________________//
  @Auth(['Admin', 'Modorator'])
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
    @User() user: any,
  ) {
    const brand = await this.brandFactory.updateBrannd(
      updateBrandDto,
      user,
      id,
    );
    const data = await this.brandService.update(id, brand);
    return {
      message: messages.brand.updated,
      success: true,
      data: data,
    };
  }
  //_________________________________3- get specific brand _________________________________//
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.brandService.findOne(id);
    return {
      message: messages.brand.fetched,
      success: true,
      data: data,
    };
  }

  //_________________________________4- get all brand _________________________________//
  @Get()
  async findAll(@Query() query: GetBrandQueryDto) {
    const result = await this.brandService.findAll(query);
    return {
      message: messages.category.fetched,
      success: true,
      data:result.data,
      pagination:result.pagination
    };
  }

  //_________________________________5- delete brand _________________________________//
  @Delete(':id')
  @Auth(['Admin', 'Modorator'])
  async remove(@Param('id') id: string) {
    await this.brandService.remove(id);
    return {
      message: messages.brand.deleted,
      success: true,
    };
  }
}
