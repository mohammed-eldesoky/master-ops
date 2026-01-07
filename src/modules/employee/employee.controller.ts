import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeFactory } from './factory/employee.factory';
import { Auth, messages, User } from 'src/common';
import { GetEmployeeQueryDto } from './dto/get-query-dto';
import { AddEmployeeRoleDto } from './dto/role.dto';

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly employeeFactory: EmployeeFactory,
  ) {}
  //___________________________1- Create Employee _________________________________//
  @Post('/create')
  @Auth(['Admin', 'Modorator'])
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @User() user: any,
  ) {
    const employee = this.employeeFactory.create(createEmployeeDto, user);
    const data = await this.employeeService.create(employee);
    return {
      message: messages.employee.created,
      success: true,
      data: data,
    };
  }
  //___________________________2- Update Employee _________________________________//
  @Patch(':id')
  @Auth(['Admin', 'Modorator'])
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @User() user: any,
  ) {
    const employee = await this.employeeFactory.update(
      id,
      updateEmployeeDto,
      user,
    );
    const data = await this.employeeService.update(id, employee);
    return {
      message: messages.employee.updated,
      success: true,
      data: data,
    };
  }

  //___________________________3- Get one Employee _________________________________//
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.employeeService.findOne(id);
    return {
      message: messages.employee.fetched,
      success: true,
      data: data,
    };
  }
  //___________________________4- Get All Employee _________________________________//

  @Get()
  async findAll(@Query() query: GetEmployeeQueryDto) {
    const data = await this.employeeService.findAll(query);
    return {
      message: messages.employee.fetched,
      success: true,
      data: data.data,
      pagination: data.pagination,
    };
  }
  //___________________________5- Remove Employee _________________________________//

  @Delete(':id')
  @Auth(['Admin', 'Modorator'])
  async remove(@Param('id') id: string) {
    await this.employeeService.remove(id);
    return {
      message: messages.employee.deleted,
      success: true,
    };
  }

  //___________________________6- Add Employee Role _________________________________//
  @Patch(':id/role')
  @Auth(['Admin'])
  async updatePostion(
    @Param('id') id: string,
    @Body() role: AddEmployeeRoleDto,
    @User() user: any,
  ) {
    const data = await this.employeeService.updatePostion(id, role, user);
    return {
      message: messages.employee.updated,
      success: true,
      data: data,
    };
  }

  //___________________________7- Remove Employee Role _________________________________//
  @Patch(':id/remove-role')
  @Auth(['Admin'])
  async removePostion(@Param('id') id: string, @User() user: any) {
    const data = await this.employeeService.removePostion(id, user);
    return {
      message: messages.employee.updated,
      success: true,
      data: data,
    };
  }
  //___________________________8- deactivate Employee  _________________________________//
  @Patch(':id/deactivate')
  @Auth(['Admin', 'Modorator'])
async deactivateEmployee(
  @Param('id') id: string,
  @User() user: any,
) {
  const data = await this.employeeService.deactivate(id, user);

  return {
    success: true,
    message: 'Employee deactivated successfully',
    data,
  };
}
//___________________________9- activate Employee  _________________________________//
@Patch(':id/activate')
@Auth(['Admin', 'Modorator'])
async activateEmployee(
  @Param('id') id: string,
  @User() user: any,
) {
  const data = await this.employeeService.activate(id, user);

  return {
    success: true,
    message: messages.employee.activated,
    data,
  };
}

}
