import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Auth, messages, User } from 'src/common';
import { BrandFactory } from './factory/brand.factory';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService,private readonly brandFactory: BrandFactory) {}
//_________________________________1- create brand _________________________________//
  @Post('/create')
  @Auth(['Admin','Modorator'])
async  create(@Body() createBrandDto: CreateBrandDto ,@User() user: any) {
  const brand = this.brandFactory.createBrand(createBrandDto,user);
  const data= await this.brandService.create(brand);
  return{
    message:messages.brand.created,
    success:true,
    data:data
  }

  }

  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
