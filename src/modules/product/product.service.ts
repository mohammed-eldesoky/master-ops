import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from 'src/models';
import { Product } from './entities/product.entity';
import { CategoryService } from '../category/category.service';
import { BrandService } from '../brand/brand.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService,
  ) {}

  //__________________________1- create product ___________________________//

  async create(product: Product, user) {
    //1- check if category exist
    const category = await this.categoryService.getCategory(
      product.categoryId.toString(),
    );
    //2- check if brand exist
    const brand = await this.brandService.findOne(product.brandId.toString());
    //fail case
    if (!category) {
      throw new NotFoundException('category does not exist');
    }
    if (!brand) {
      throw new NotFoundException('brand does not exist');
    }
    //check if product exist
    const productExist = await this.productRepository.getOne({
      slug: product.slug,
    });
    //fail case
    if (productExist) {
      throw new BadRequestException('product already exist');
    }
    //success case
    return await this.productRepository.create(product);
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
