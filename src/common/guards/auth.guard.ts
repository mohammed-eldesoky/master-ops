import {
    CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/models';
import { Types } from 'mongoose';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepo: UserRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const publicRole = this.reflector.get('PUBLIC', context.getHandler());
      if (publicRole) {
        //if it's public role do not check for role
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const { authorization } = request.headers;
      if (!authorization) {
        throw new UnauthorizedException('Authorization header missing');
      }
      //verify token logic here
      const payload = this.jwtService.verify<{
        _id: string;
        email: string;
        role: string;
      }>(authorization, { secret: this.configService.get('jwt').secret });

      //check if payload exists
      const userExist = this.userRepo.exist({
        _id: new Types.ObjectId(payload._id),
      });
      if (!userExist) {
        throw new UnauthorizedException('user does not exist');
      }
      request.user = userExist;
      return true; //
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
