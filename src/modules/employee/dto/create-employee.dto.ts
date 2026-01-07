import { IsString, IsNotEmpty, IsEmail, IsOptional, IsArray, IsEnum } from 'class-validator';
import { Types } from 'mongoose';
import { EMPLOYEE_ROLE, EMPLOYEE_STATUS } from 'src/common';

export class CreateEmployeeDto {
  //________________ Basic Info _________________//
  @IsString()
  @IsNotEmpty()
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
  @IsArray()
  @IsEnum(EMPLOYEE_ROLE, { each: true })
  roles?: EMPLOYEE_ROLE[];


}

