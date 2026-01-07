import { IsString, IsNotEmpty, IsEmail, IsOptional, IsArray, IsEnum, MinLength } from 'class-validator';
import { Types } from 'mongoose';
import { EMPLOYEE_ROLE, EMPLOYEE_STATUS } from 'src/common';

export class CreateEmployeeDto {
  //________________ Basic Info _________________//
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Full name must be at least 2 characters long' })
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  //________________ Job Info _________________//
  @IsNotEmpty()
  departmentId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  jobTitle: string;


  @IsOptional()
  @IsEnum(EMPLOYEE_ROLE, { each: true })
  role?: EMPLOYEE_ROLE;


}

