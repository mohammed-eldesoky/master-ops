import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from 'src/models';
import { User } from '../auth/entities/auth.entity';
import { GetUsersQueryDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  //_____________________________1-update user _______________________________
  // async update(id: string, userEntity: User) {
  //   //check if user exists
  //   const userExist = await this.userRepository.getOne({ _id: id });
  //   //fail case
  //   if (!userExist) {
  //     throw new Error('User does not exist');
  //   }

  //   //update user
  //   return await this.userRepository.update({ _id: id}, userEntity);
  // }

async getAllUsers(query: GetUsersQueryDto) {
  const {
    page = '1',
    limit = '10',
    sort = '-createdAt',
    role,
    isActive,
    search,
  } = query;

  const pageNumber = Math.max(+page, 1);
  const limitNumber = Math.min(+limit, 50);
  const skip = (pageNumber - 1) * limitNumber;


  const filter: any = {
    isDeleted: false,
  };

  if (role) {
    filter.role = role;
  }

  if (isActive !== undefined) {
    filter.isActive = isActive === 'true';
  }

  if (search) {
    filter.$or = [
      { userName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }


  const projection = {
    password: 0,
    otp: 0,
  };

 
  const options = {
    skip,
    limit: limitNumber,
    sort,
    populate: {
      path: 'departmentId',
      select: 'name',
    },
    lean: true,
  };

  const [users, total] = await Promise.all([
    this.userRepository.getAll(filter, projection, options),
    this.userRepository.countDocuments(filter),
  ]);

  return {
    users,
    pagination: {
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    },
  };
}


  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
