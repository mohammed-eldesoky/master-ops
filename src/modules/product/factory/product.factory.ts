import slugify from 'slugify';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from './../dto/create-product.dto';
import { Types } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from 'src/models';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductFactory {
  constructor(private readonly productRepo: ProductRepository) {}

  createProduct(createProductDto: CreateProductDto, user: any) {
    const product = new Product();
    product.name = createProductDto.name;
    product.description = createProductDto.description;
    product.slug = slugify(createProductDto.name, { lower: true, trim: true });
    //ids
    product.categoryId = new Types.ObjectId(createProductDto.categoryId);
    product.brandId = new Types.ObjectId(createProductDto.brandId);
    product.createdBy = user._id;
    product.updatedBy = user._id;

    //number
    product.price = createProductDto.price;
    product.discountAmount = createProductDto.discountAmount;
    product.disCountType = createProductDto.disCountType;
    product.stock = createProductDto.stock;
    product.sold = 0;

    //specification
    product.colors = createProductDto.colors;
    product.sizes = createProductDto.sizes;

    //images
    product.images = createProductDto.images;

    product.isActive = true;

    return product;
  }
  async updateProduct(
    updateProductDto: UpdateProductDto,
    user: any,
    id: string,
  ) {
     const productExist = await this.productRepo.getOne({ _id: id });

  if (!productExist) {
    throw new NotFoundException('product does not exist');
  }

  const newName = updateProductDto.name ?? productExist.name;

  return {
    name: newName,
    description: updateProductDto.description ?? productExist.description,
    slug:
      updateProductDto.name
        ? slugify(newName, { lower: true, trim: true })
        : productExist.slug,

    categoryId: updateProductDto.categoryId
      ? new Types.ObjectId(updateProductDto.categoryId)
      : productExist.categoryId,

    brandId: updateProductDto.brandId
      ? new Types.ObjectId(updateProductDto.brandId)
      : productExist.brandId,

    price:
      updateProductDto.price !== undefined
        ? updateProductDto.price
        : productExist.price,

    discountAmount:
      updateProductDto.discountAmount !== undefined
        ? updateProductDto.discountAmount
        : productExist.discountAmount,

    disCountType:
      updateProductDto.disCountType ?? productExist.disCountType,

    stock:
      updateProductDto.stock !== undefined
        ? updateProductDto.stock
        : productExist.stock,

    colors: updateProductDto.colors ?? productExist.colors,
    sizes: updateProductDto.sizes ?? productExist.sizes,
    images: updateProductDto.images ?? productExist.images,

    updatedBy: user._id,
  };
}
}