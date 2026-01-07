import { IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { EMPLOYEE_ROLE } from "src/common";

export class AddEmployeeRoleDto {
 @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'jobTitle must be at least 2 characters long' })
  jobTitle: string;
}

export class RemoveEmployeeRoleDto {
    @IsNotEmpty()
 @IsString()
  @MinLength(2, { message: 'jobTitle must be at least 2 characters long' })
  jobTitle: string;
}
