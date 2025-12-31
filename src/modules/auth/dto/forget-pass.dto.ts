import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { SendOtpDto } from './send-otp.dto';

export class ForgetPassDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  otp: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
    message: 'Password must contain at least one letter and one number',
  })
  NewPassword: string;
}
