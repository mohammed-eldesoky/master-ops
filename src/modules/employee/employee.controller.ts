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
   const data =  await this.employeeService.findOne(id);
    return {
      message: messages.employee.fetched,
      success: true,
      data: data,
    };
  }
  //___________________________4- Get All Employee _________________________________//

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }
//___________________________5- Remove Employee _________________________________//

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
