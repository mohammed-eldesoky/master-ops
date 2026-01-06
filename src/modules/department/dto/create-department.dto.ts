import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
