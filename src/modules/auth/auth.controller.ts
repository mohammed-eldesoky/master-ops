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
import { VerifyDto } from './dto/verify.dto';
import { LoginDto } from './dto/login.dto';
import { SendOtpDto } from './dto/send-otp.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authFactory: AuthFactory,
  ) {}
  //________________________________1-register user_______________________________
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
  //________________________________2- Verify user_______________________________
  @Post('/verify')
  async verify(@Body() verifyDto: VerifyDto) {
   await this.authService.verify(verifyDto);
    return {
      message: messages.user.verifyed,
      success: true,
    };
  }
  //________________________________3- Login user_______________________________
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const data = await this.authService.login(loginDto);
    return {
      message: messages.user.login,
      success: true,
      data: data,
    };
  }
  //________________________________4- send otp_______________________________

  @Post('/send-otp')
  async sendOtp(@Body() sendotpDto: SendOtpDto) {
    await this.authService.sendOtp(sendotpDto);
    return {
      message: messages.otp.otpSent,
      success: true,
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
