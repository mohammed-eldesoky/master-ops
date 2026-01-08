import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  Matches,
  IsDate,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(20)
  userName: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  dob: Date;

  @IsString()
  @IsOptional()
  gender: string;
}
