import { Types } from 'mongoose';

export class Brand {
  readonly _id: Types.ObjectId;

  name: string;

  description: string;

  slug: string;

  createdBy: Types.ObjectId;

  updatedBy: Types.ObjectId;

  isActive: boolean;

  logo: {
    secure_url: string;
    public_id: string;
  };
}
