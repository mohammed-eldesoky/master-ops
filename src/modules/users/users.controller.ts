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
import { UsersService } from './users.service';
import { Auth, messages, User } from 'src/common';
import { GetUsersQueryDto } from './dto/get-user.dto';



@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,

  ) {}

  // @Patch('/:id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateUserDto: UpdateUserDto,
  //   @User() user: any,
  // ) {
  //   const updatedUser = await this.userFactory.update(id, updateUserDto, user);
  //   const data = await this.usersService.update(id, updatedUser);
  //   return {
  //     message: messages.user.updated,
  //     success: true,
  //     data,
  //   };
  // }

  

  @Get()
@Auth(['Admin','Modorator'])
 async findAll(@Query() query: GetUsersQueryDto) {
 const data =await this.usersService.getAllUsers(query);
 return{
  message:messages.user.fetched,
  success:true,
  data:data.users,
  pagination:data.pagination
 }
  }
//_______________________________1- get specific user ______________________________
  @Get(':id')
  @Auth(['Admin','Modorator'])
 async findOne(@Param('id') id: string) {
   const data = await this.usersService.findOne(id);
   return {
     message: messages.user.fetched,
     success: true,
     data,
   };
  }


  @Patch(':id/activate')
 @Auth(['Admin','Modorator'])
async activate(@Param('id') id: string) {
  await this.usersService.activate(id, true);
  return {
    message: messages.user.activated,
    success: true,
  };
}

@Patch(':id/deactivate')
 @Auth(['Admin','Modorator'])
async deactivate(@Param('id') id: string) {
  await this.usersService.activate(id, false);
  return {
    message: messages.user.deactivated,
    success: true,
  };
}
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
