import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/register.dto';
import { AuthFactory } from './factory/auth.factory';
import { messages } from 'src/common';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authFactory: AuthFactory,
  ) {}

  @Post('/register')
  async create(@Body() createAuthDto: CreateAuthDto) {
    const user = await this.authFactory.createUser(createAuthDto);
    const result = await this.authService.register(user);

    //send response
    return {
      message: messages.user.created,
      success: true,
      data: result,
    };
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
