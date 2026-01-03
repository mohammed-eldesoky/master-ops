import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateCategoryDto {
  readonly _id: Types.ObjectId;
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsObject()
  @IsOptional()
  logo: {
    secure_url: string;
    public_id: string;
  };
}
