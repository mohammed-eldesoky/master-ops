import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Auth, messages, User } from 'src/common';
import { DepartmentFactory } from './factory/department.factory';

@Controller('department')
export class DepartmentController {
  constructor(
    private readonly departmentService: DepartmentService,
    private readonly departmentFactory: DepartmentFactory,
  ) {}
  //___________________________1-create department _________________________________//
  @Post('/create')
  @Auth(['Admin', 'Modorator'])
  async create(
    @Body() createDepartmentDto: CreateDepartmentDto,
    @User() user: any,
  ) {
    const department = this.departmentFactory.createDepartment(
      createDepartmentDto,
      user,
    );
    const data = await this.departmentService.create(department);
    return {
      message: messages.department.created,
      success: true,
      data: data,
    };
  }

  //___________________________2-update department _________________________________//
  @Patch(':id')
  @Auth(['Admin', 'Modorator'])
  async update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
    @User() user: any,
  ) {
    const department = await this.departmentFactory.updateDepartment(
      id,
      updateDepartmentDto,
      user,
    );
    const data = await this.departmentService.update(id, department);
    return {
      message: messages.department.updated,
      success: true,
      data: data,
    };
  }
  //___________________________3-get one department _________________________________//

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.departmentService.findOne(id);
    return {
      message: messages.department.fetched,
      success: true,
      data: data,
    };
  }

  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  //___________________________5-delete department _________________________________//
  @Delete(':id')
  @Auth(['Admin', 'Modorator'])
 async  remove(@Param('id') id: string) {
  await this.departmentService.remove(id);
    return {
      message: messages.department.deleted,
      success: true,
 
    };
  }
}
