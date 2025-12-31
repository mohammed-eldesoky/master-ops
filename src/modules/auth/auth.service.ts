import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/register.dto';
import { User } from './entities/auth.entity';
import { CustomerRepository } from 'src/models';
import { sendMail } from 'src/common';
import { VerifyDto } from './dto/verify.dto';

@Injectable()
export class AuthService {
  constructor(private readonly customerRepo: CustomerRepository) {}
  //________________________________1-register user_______________________________
  async register(user: User) {
    //1- check if user already exists
    const userExists = await this.customerRepo.exist({ email: user.email });
    //fail case
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    //2- create user
    const newUser = await this.customerRepo.create(user);
    //send mail
    await sendMail({
      from: 'Master-Ops ',
      to: user.email,
      subject: 'Verify your account',
      html: `<h1>Hello ${user.userName}, Thank you for registering at our app</h1>
      <h3>Your OTP is: <b style="color:green">${user.otp}</b></h3>`,
    });

    const { password, otp, otpExpiry, ...userObject } = JSON.parse(
      JSON.stringify(newUser),
    );

    return userObject;
  }

  //________________________________2- Verify user_______________________________

  async verify(verifyDto: VerifyDto) {
    const { email, otp } = verifyDto;
    //1-check if user exists
    const userExist = await this.customerRepo.exist({ email });
    //fail case
    if (!userExist) {
      throw new NotFoundException('User does not exist');
    }
    //2-check if user is already verified
    if (userExist.isVerified) {
      throw new BadRequestException('User is already verified');
    }
    //3-check if otp matches

    if (userExist.otp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    //4-check if otp is expired
    if (
      !userExist.otpExpiration ||
      userExist.otpExpiration.getTime() < Date.now()
    ) {
      throw new BadRequestException('OTP has expired');
    }

    //5-verify user
    await this.customerRepo.update(
      { email },
      { isVerified: true, $unset: { otp: '', otpExpiration: '' } },
    );
  }
  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
