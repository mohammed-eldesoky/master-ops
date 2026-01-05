import { Types } from 'mongoose';
import { DISCOUNT_TYPE } from 'src/common';

export class Product {
  name: string;

  description: string;

  slug: string;

  categoryId: Types.ObjectId;

  brandId: Types.ObjectId;

  createdBy: Types.ObjectId;

  updatedBy: Types.ObjectId;

  price: number;

  discountAmount: number;

  disCountType: DISCOUNT_TYPE;

  finalPrice: number; // virtual

  stock: number;

  sold: number;

  colors: string[];

  sizes: string[];

  images: {
    secure_url: string;
    public_id: string;
  }[];

  isActive: boolean;
}
