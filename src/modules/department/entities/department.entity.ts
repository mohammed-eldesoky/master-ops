import { Types } from 'mongoose';

export class Department {
  name: string;

  description?: string;

  isActive: boolean;

  createdBy: Types.ObjectId;

  updatedBy: Types.ObjectId;
}
