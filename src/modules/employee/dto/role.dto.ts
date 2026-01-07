import { IsEnum, IsNotEmpty } from "class-validator";
import { EMPLOYEE_ROLE } from "src/common";

export class AddEmployeeRoleDto {
  @IsEnum(EMPLOYEE_ROLE)
  @IsNotEmpty()
  role: EMPLOYEE_ROLE;
}

export class RemoveEmployeeRoleDto {
    @IsNotEmpty()
  @IsEnum(EMPLOYEE_ROLE)
  role: EMPLOYEE_ROLE;
}
