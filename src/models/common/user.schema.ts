import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Gender, USER_AGENT } from 'src/common/enum/enum';

@Schema({
  timestamps: true,
  discriminatorKey: 'role',
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class User {
  readonly _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  userName: string;
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password?: string;

  @Prop({ type: Boolean, default: false })
  isVerified: boolean;

  @Prop({ type: String, default: null })
  otp: string;

  @Prop({ type: Date, default: null })
  otpExpiration: Date;

  @Prop({ type: String, enum: Gender, required: false })
  gender?: Gender;

  @Prop({ type: Date })
  banUntil: Date;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
  @Prop({ type: String, enum: USER_AGENT, default: USER_AGENT.local })
  userAgent: string;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Department' })
  departmentId: Types.ObjectId;
}

export const userSchema = SchemaFactory.createForClass(User);
userSchema.path('password').validate({
  validator: function (this: any) {
    return this.userAgent === USER_AGENT.google || !!this.password;
  },
  message: 'Password is required for non-Google users',
});

userSchema.path('gender').validate({
  validator: function (this: any) {
    return this.userAgent === USER_AGENT.google || !!this.gender;
  },
  message: 'Gender is required for non-Google users',
});