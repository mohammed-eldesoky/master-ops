import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from '../dto/register.dto';
import { User } from '../entities/auth.entity';
import { Gender, USER_AGENT } from 'src/common/enum/enum';
import * as bcrypt from 'bcrypt';
import { generateOtp } from 'src/common';
@Injectable()
export class AuthFactory {
  async createUser(registerDto: CreateAuthDto) {
    const user = new User();
    user.userName = registerDto.userName;
    user.email = registerDto.email;
    if (registerDto.userAgent === USER_AGENT.google) {
      user.password = undefined;
    } else {
      if (!registerDto.password) {
        throw new NotFoundException('Password is required for local users');
      }
      user.password = await bcrypt.hash(registerDto.password, 10);
    }

    user.otp = generateOtp();
    user.otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes
    user.dob = registerDto.dob;
    user.gender = (registerDto.gender as Gender) || Gender.MALE;
    user.isVerified = false;
    user.isActive = true;
    user.isDeleted = false;

    return user;
  }
}
