import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/register.dto';
import { User } from './entities/auth.entity';
import { CustomerRepository } from 'src/models';
import { sendMail } from 'src/common';

@Injectable()
export class AuthService {
  constructor(private readonly customerRepo: CustomerRepository) {}

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
