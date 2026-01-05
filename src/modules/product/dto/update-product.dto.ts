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

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;
  @IsOptional()
  @IsMongoId()
  @IsNotEmpty()
  categoryId: Types.ObjectId;
  @IsOptional()
  @IsMongoId()
  @IsNotEmpty()
  brandId: Types.ObjectId;

  //______________________number_______________________//
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsOptional()
  @IsValidDiscount()
  discountAmount: number;

  @IsString()
  @IsOptional()
  @IsEnum(DISCOUNT_TYPE)
  disCountType: DISCOUNT_TYPE;
  @IsOptional()
  @IsNumber()
  @IsOptional()
  stock: number;

  //______________________specification_______________________//
  @IsOptional()
  @IsArray()
  @IsString({ each: true }) // check each element is string
  colors: string[];

  @IsOptional()
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
