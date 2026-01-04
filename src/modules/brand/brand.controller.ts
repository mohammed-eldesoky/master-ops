import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Auth, messages, User } from 'src/common';
import { BrandFactory } from './factory/brand.factory';

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
async  findOne(@Param('id') id: string) {
   const data = await this.brandService.findOne(id);
    return {
      message: messages.brand.fetched,
      success: true,
      data: data,
    };
  }

  @Get()
  findAll() {
    return this.brandService.findAll();
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
