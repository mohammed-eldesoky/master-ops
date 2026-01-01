import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/register.dto';
import { User } from './entities/auth.entity';
import {
  CustomerRepository,
  TokenRepository,
  UserRepository,
} from 'src/models';
import {
  generateOtp,
  generateOtpExpiryTime,
  sendMail,
  TOKEN_TYPE,
} from 'src/common';
import { VerifyDto } from './dto/verify.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { SendOtpDto } from './dto/send-otp.dto';
import { ForgetPassDto } from './dto/forget-pass.dto';
import { UpdatePassDto } from './dto/update-pass.dto';
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
    const match = await bcrypt.compare(password, customer?.password || 'nngf');
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
  //________________________________4- Send OTP_______________________________

  async sendOtp(sendotpDto: SendOtpDto) {
    const { email } = sendotpDto;
    //1- check if user exists
    const userExist = await this.customerRepo.exist({ email });
    //fail case
    if (!userExist) {
      throw new NotFoundException('User does not exist');
    }
    //check if user (soft deleted)
    if (userExist.isDeleted) {
      throw new BadRequestException('User iS deleted');
    }
    // check ban
    if (userExist.banUntil && userExist.banUntil.getTime() > Date.now()) {
      const remaining =
        Math.ceil(userExist.banUntil.getTime() - Date.now()) / 1000;
      throw new BadRequestException(
        `User is banned , Try again after ${remaining}`,
      );
    }

    const otp = generateOtp();
    const otpExpiration = generateOtpExpiryTime(10); // 10 minutes

    sendMail({
      from: 'Master-Ops ',
      to: userExist.email,
      subject: 'Verify your account',
      html: `<h1>Hello ${userExist.userName}</h1>
  <h3>Your OTP is: <b style="color:green">${otp}</b></h3>`,
    });

    await this.customerRepo.update({ email }, { otp, otpExpiration });
  }

  //_______________________________ 5-Forget password _______________________________
  async forgetPassword(forgetPassDto: ForgetPassDto) {
    const { email, otp, NewPassword } = forgetPassDto;
    //1-check if user exists
    const userExist = await this.customerRepo.exist({ email });
    //fail case
    if (!userExist) {
      throw new NotFoundException('User does not exist');
    }
    //check if otp matches
    if (userExist.otp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }
    //check if otp is expired
    if (
      !userExist.otpExpiration ||
      userExist.otpExpiration.getTime() < Date.now()
    ) {
      throw new BadRequestException('OTP has expired');
    }
    //update password
    await this.customerRepo.update(
      { email },
      {
        $set: { password: NewPassword },
        $unset: { otp: '', otpExpiration: '' },
      },
    );
  }

  //_______________________________ 6-Update password _______________________________

  async updatePassword(updatePassDto: UpdatePassDto, user: any) {
    const { oldPassword, newPassword } = updatePassDto;
    //1-check if user exists
    const userExist = await this.userRepository.getOne({ _id: user._id });
    //fail case
    if (!userExist) {
      throw new NotFoundException('User does not exist');
    }
    //2-check if old password matches
    const match = await bcrypt.compare(
      oldPassword,
      userExist?.password || 'nngf',
    );
    if (!match) {
      throw new BadRequestException('Invalid old password');
    }
    //3-update password
    await this.userRepository.update(
      { _id: user._id },
      { password: newPassword },
    );
  }

  //________________________________7- Refresh token_______________________________
  async refreshToken(oldRefreshToken: string) {
    if (!oldRefreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }
    //check if token exists in db
    const tokenExist = await this.tokenRepo.getOne({
      token: oldRefreshToken,
      type: TOKEN_TYPE.REFRESH,
      expiresAt: { $gt: new Date() },
    });
    if (!tokenExist) {
      throw new UnauthorizedException('Invalid refresh token or expired');
    }
    //secret key
    const secret = this.configService.get('jwt').secret;
    //verify token
    const payload = this.jwtService.verify(oldRefreshToken, {
      secret: secret,
    });

    // rotate refresh token
    await this.tokenRepo.delete({ _id: tokenExist._id });

    const newAccessToken = this.jwtService.sign(
      { _id: payload._id, role: payload.role },
      { secret: secret, expiresIn: '15m' },
    );

    const newRefreshToken = this.jwtService.sign(
      { _id: payload._id },
      { secret: secret, expiresIn: '7d' },
    );

    await this.tokenRepo.create({
      token: newRefreshToken,
      user: payload._id,
      type: 'refresh',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
