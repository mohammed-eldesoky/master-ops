import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeFactory } from './factory/employee.factory';
import { Auth, messages, User } from 'src/common';

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

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
