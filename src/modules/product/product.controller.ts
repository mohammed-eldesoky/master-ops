import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth, messages, User } from 'src/common';
import { ProductFactory } from './factory/product.factory';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productFactory: ProductFactory,
  ) {}
  //__________________________1- create product ___________________________//
  @Post('/create')
  @Auth(['Admin', 'Modorator'])
  async create(@Body() createProductDto: CreateProductDto, @User() user: any) {
    const product = this.productFactory.createProduct(createProductDto, user);
    const data = await this.productService.create(product, user);
    return {
      message: messages.product.created,
      success: true,
      data: data,
    };
  }

  //__________________________2- update product ___________________________//
  @Patch(':id')
  @Auth(['Admin', 'Modorator'])
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @User() user: any,
  ) {
    const product = await this.productFactory.updateProduct(
      updateProductDto,
      user,
      id,
    );
    const data = await this.productService.update(id, product);
    return {
      message: messages.product.updated,
      success: true,
      data: data,
    };
  }
  //__________________________3- find one product ___________________________//
  @Get(':id')
async   findOne(@Param('id') id: string) {
const data = await this.productService.findOne(id);
    return {
      message: messages.product.fetched,
      success: true,
      data: data,
    }
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
