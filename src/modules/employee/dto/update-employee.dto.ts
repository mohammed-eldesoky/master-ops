import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsOptional,
  IsEnum,
  IsMongoId,
} from 'class-validator';
import { Types } from 'mongoose';
import { EMPLOYEE_ROLE } from 'src/common';

export class UpdateEmployeeDto {
  //________________ Basic Info _________________//
  @IsString()
  @IsOptional()
  @MinLength(2, { message: 'Full name must be at least 2 characters long' })
  fullName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone: string;

  //________________ Job Info _________________//
  @IsOptional()
  @IsMongoId()
  departmentId: Types.ObjectId;

  @IsOptional()
  @IsString()
  jobTitle: string;


}
