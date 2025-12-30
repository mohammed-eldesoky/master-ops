import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Gender } from 'src/common/enum/enum';

@Schema({
  timestamps: true,
  discriminatorKey: 'role',
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
}) //2-options here
//1-defention of user schema
export class Customer {
  readonly _id: Types.ObjectId;

  userName: string;

  email: string;

  password?: string;

  isVerified: boolean;

  otp: string;

  otpExpiration: Date;

  gender?: Gender;

  banUntil: Date;

  @Prop({ type: Date, required: false })
  dob: Date;
  isActive: boolean;

  userAgent: string;

  isDeleted: boolean;

  departmentId: Types.ObjectId;
}

export const customerSchema = SchemaFactory.createForClass(Customer);
