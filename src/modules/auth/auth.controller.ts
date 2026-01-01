import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/register.dto';
import { AuthFactory } from './factory/auth.factory';
import { Auth, messages, User } from 'src/common';
import { VerifyDto } from './dto/verify.dto';
import { LoginDto } from './dto/login.dto';
import { SendOtpDto } from './dto/send-otp.dto';
import { ForgetPassDto } from './dto/forget-pass.dto';
import { UpdatePassDto } from './dto/update-pass.dto';

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

  //________________________________5- forget password_______________________________
  @Patch('/forget-password')
  async forgetPassword(@Body() forgetPassDto: ForgetPassDto) {
    await this.authService.forgetPassword(forgetPassDto);
    return {
      message: messages.passWord.updated,
      success: true,
    };
  }
  //________________________________6- update password_______________________________
  @Patch('/update-password')
  @Auth(['Customer', 'Admin', 'Modorator'])
  async updatePassword(
    @Body() updatePassDto: UpdatePassDto,
    @User() user: any,
  ) {
    await this.authService.updatePassword(updatePassDto, user);
    return {
      message: messages.passWord.updated,
      success: true,
    };
  }
   //________________________________7- refresh token_______________________________
  @Post('/refresh-token')
  async refreshToken( @Headers('refreshToken') refreshToken: string) {
    const data = await this.authService.refreshToken(refreshToken);
    return {
      message: messages.token.refresh,
      success: true,
      data: data,
    };
  }
}