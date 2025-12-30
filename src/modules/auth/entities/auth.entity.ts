import { Types } from 'mongoose';
import { Gender } from 'src/common/enum/enum';

export class User {
  readonly _id: Types.ObjectId;
  userName: string;
  email: string;
  password?: string;
  isVerified: boolean;
  otp: string;
  otpExpiration: Date;
  gender?: Gender;
  banUntil: Date;
  dob: Date;
  isActive: boolean;
  userAgent: string;
  isDeleted: boolean;
  departmentId: Types.ObjectId;
}
