import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Types } from 'mongoose';
import { DISCOUNT_TYPE } from 'src/common';
import { IsValidDiscount } from 'src/common/decorators/discount.decorator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;

  @IsMongoId()
  @IsNotEmpty()
  categoryId: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  brandId: Types.ObjectId;

  //______________________number_______________________//
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsValidDiscount()
  discountAmount: number;

  @IsString()
  @IsOptional()
  @IsEnum(DISCOUNT_TYPE)
  disCountType: DISCOUNT_TYPE;

  @IsNumber()
  @IsOptional()
  stock: number;

  //______________________specification_______________________//
  @IsArray()
  @IsString({ each: true }) // check each element is string
  colors: string[];

  @IsArray()
  @IsString({ each: true }) // check each element is string
  sizes: string[];
  //______________________images_______________________//
  @IsOptional()
  images: {
    secure_url: string;
    public_id: string;
  }[];
}
