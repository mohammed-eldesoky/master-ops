import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { EMPLOYEE_STATUS, EMPLOYEE_ROLE } from 'src/common';

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Employee {
  readonly _id: Types.ObjectId;

  //________________ Basic Info _________________//
  @Prop({ type: String, trim: true, required: true })
  fullName: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  })
  phone: string;

  //________________ Job Info _________________//
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Department',
    required: true,
    index: true,
  })
  departmentId: Types.ObjectId;

  @Prop({ type: String, required: true, trim: true })
  jobTitle: string;

  @Prop({
    type: [String],
    enum: EMPLOYEE_ROLE,
    default: [],
    index: true,
  })
  roles: EMPLOYEE_ROLE[]; // HR, MANAGER, ACCOUNTANT ...

  @Prop({
    type: String,
    enum: EMPLOYEE_STATUS,
    default: EMPLOYEE_STATUS.ACTIVE,
    index: true,
  })
  status: EMPLOYEE_STATUS;

  @Prop({
    type: Date,
    default: Date.now,
  })
  hireDate: Date;

  @Prop({ type: Date })
  terminationDate?: Date;

  //________________ System Fields _________________//
  @Prop({ type: Boolean, default: true, index: true })
  isActive: boolean;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  updatedBy: Types.ObjectId;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

//________________ Indexes _________________//
EmployeeSchema.index({ email: 1 });
EmployeeSchema.index({ phone: 1 });
EmployeeSchema.index({ departmentId: 1 });
EmployeeSchema.index({ status: 1 });
EmployeeSchema.index({ roles: 1 });
EmployeeSchema.index({ isActive: 1 });

// Text search for dashboard & filters
EmployeeSchema.index({
  fullName: 'text',
  email: 'text',
  phone: 'text',
});
