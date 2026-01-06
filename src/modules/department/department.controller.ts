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
import { messages, User } from 'src/common';
import { DepartmentFactory } from './factory/department.factory';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService, private readonly departmentFactory: DepartmentFactory) {}

  @Post('/create')
 async create(@Body() createDepartmentDto: CreateDepartmentDto, @User() user: any) {
const department = this.departmentFactory.createDepartment(createDepartmentDto, user);
const data = await this.departmentService.create(department);
return {
  message: messages.department.created,
  success: true,
  data: data,
};
  }

  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentService.update(+id, updateDepartmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id);
  }
}
