import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/register.dto';
import { User } from './entities/auth.entity';
import { CustomerRepository, TokenRepository, UserRepository } from 'src/models';
import { sendMail, TOKEN_TYPE } from 'src/common';
import { VerifyDto } from './dto/verify.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly customerRepo: CustomerRepository,
    private readonly jwtService: JwtService,
    private readonly tokenRepo: TokenRepository,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {}
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
  //________________________________3- Login user_______________________________

  async login(loginDto: LoginDto) {
        const { email, password } = loginDto;
    //check if customer with email exists
    const customer = await this.userRepository.getOne({ email: email });
    //fail case customer does not exist
    if (!customer) {
      throw new UnauthorizedException('invalid credentials');
    }
    //check if password matches
    const match = await bcrypt.compare(password, customer?.password||'nngf');
    if (!match) {
      throw new UnauthorizedException('invalid credentials');
    }

    // generate access & refresh tokens
    const payload = {
      _id: customer._id,
      email: customer.email,
      role: 'customer',
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt').secret,
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt').secret,
      expiresIn: '7d',
    });

    // save tokens to database

      await this.tokenRepo.create({
        token: refreshToken,
        user: customer._id,
        type: TOKEN_TYPE.REFRESH,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      });

    return {
      accessToken,
      refreshToken,
    };
  
  }
//________________________________3- Login user_______________________________

async sendOtp(){
  
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
