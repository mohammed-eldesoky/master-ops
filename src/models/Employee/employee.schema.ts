import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { EMPLOYEE_STATUS } from "src/common";

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Employee {
  readonly _id: Types.ObjectId;

  //________________ Basic Info _________________//
  @Prop({ type: String, required: true, trim: true })
  firstName: string;

  @Prop({ type: String, required: true, trim: true })
  lastName: string;

  @Prop({ type: String, trim: true })
  fullName: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
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
    default: [],
    index: true,
  })
  roles: string[]; // HR, MANAGER, ACCOUNTANT ...

  @Prop({
    type: String,
    enum: EMPLOYEE_STATUS,
    default: EMPLOYEE_STATUS.ACTIVE,
    index: true,
  })
  status: EMPLOYEE_STATUS;

  @Prop({ type: Date, required: true })
  hireDate: Date;

  @Prop({ type: Date })
  terminationDate?: Date;

  //________________ Salary Definition _________________//
  @Prop({
    type: {
      base: { type: Number, required: true, min: 0 },
      allowance: { type: Number, default: 0, min: 0 },
      insurance: { type: Number, default: 0, min: 0 },
      tax: { type: Number, default: 0, min: 0 },
    },
    _id: false,
  })
  salary: {
    base: number;
    allowance: number;
    insurance: number;
    tax: number;
  };

  //________________ System Fields _________________//
  @Prop({ type: Boolean, default: true, index: true })
  isActive: boolean;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  updatedBy: Types.ObjectId;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);