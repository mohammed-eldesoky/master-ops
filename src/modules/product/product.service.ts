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

  //__________________________2- update product ___________________________//
  async update(id: string, updateData: Partial<Product>) {
    const productExist = await this.productRepository.getOne({ _id: id });

    if (!productExist) {
      throw new NotFoundException('product does not exist');
    }

    // stock logic (additive)
    if (updateData.stock !== undefined) {
      updateData.stock = productExist.stock + updateData.stock;
    }

    // merge colors
    if (updateData.colors?.length) {
      const colors = new Set(productExist.colors);
      updateData.colors.forEach((c) => colors.add(c));
      updateData.colors = [...colors];
    }

    // merge sizes
    if (updateData.sizes?.length) {
      const sizes = new Set(productExist.sizes);
      updateData.sizes.forEach((s) => sizes.add(s));
      updateData.sizes = [...sizes];
    }

    return await this.productRepository.update({ _id: id }, updateData);
  }

  //__________________________3- find one product ___________________________//
  async findOne(id: string) {
    //check if product exist
    const productExist = await this.productRepository.getOne(
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
    if (!productExist) {
      throw new NotFoundException('product does not exist');
    }
    //success case
    return productExist;
  }

  findAll() {
    return `This action returns all product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
