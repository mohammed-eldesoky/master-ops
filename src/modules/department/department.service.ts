import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentRepository } from 'src/models';
import { Department } from './entities/department.entity';
import strict from 'assert/strict';
import { GetdepartmentQueryDto } from './dto/get-department.dto';

@Injectable()
export class DepartmentService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  //___________________________1-create department _________________________________//
  async create(department: Department) {
    //check if department already exist
    const existingDepartment = await this.departmentRepository.exist({
      name: department.name,
    });
    //fail case
    if (existingDepartment) {
      throw new ConflictException('Department already exists');
    }
    //success case
    return await this.departmentRepository.create(department);
  }

  //___________________________2-update department _________________________________//
  async update(id: string, department: Department) {
    // check if department already exist
    const existingDepartment = await this.departmentRepository.getOne({
      _id: id,
    });
    if (!existingDepartment) {
      throw new NotFoundException('Department not found');
    }
    // 2- check unique name
    if (department.name && department.name !== existingDepartment.name) {
      const nameExist = await this.departmentRepository.exist({
        name: department.name,
      });

      if (nameExist) {
        throw new BadRequestException('Department name already exists');
      }
    }
    return await this.departmentRepository.update({ _id: id }, department);
  }

  //___________________________3-find one department _________________________________//
  async findOne(id: string) {
    const department = await this.departmentRepository.getOne(
      { _id: id },
      {},
      {
        populate: [
          { path: 'createdBy', select: 'userName id' },
          { path: 'updatedBy', select: 'userName id' },
        ],
      },
    );
    if (!department) {
      throw new NotFoundException('Department not found');
    }
    return department;
  }
//___________________________4-find all department _________________________________//

  async findAll(QUERY: GetdepartmentQueryDto) {
    const {
      page = 1,
      limit = 10,
      sort = '-createdAt',
      isActive,
      search,
    } = QUERY;
    //pagination
    const skip = (page - 1) * limit;
    //filter
    const filter: any = {};
    if (isActive !== undefined) {
      filter.isActive = isActive;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    // options
    const options = {
      skip,
      limit,
      sort,
      populate: [
        { path: 'createdBy', select: 'userName _id' },
        { path: 'updatedBy', select: 'userName _id' },
      ],
    };

    const [categories, total] = await Promise.all([
    this.departmentRepository.getAll(filter, {}, options),
    this.departmentRepository.countDocuments(filter),
  ]);
    //success case
    return {
      data: categories,
      pagination: {
        page,
        limit,
        total,
        totalPage: Math.ceil(total / limit),
      },
    };
  }
  //___________________________5-delete department _________________________________//
  async remove(id: string) {
    const department = await this.departmentRepository.exist({ _id: id });
    if (!department) {
      throw new NotFoundException('Department not found');
    }
    // delete department
    return await this.departmentRepository.delete({ _id: id });
  }
}
