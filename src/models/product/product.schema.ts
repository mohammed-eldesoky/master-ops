import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { DISCOUNT_TYPE } from 'src/common';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Product {
  readonly _id: Types.ObjectId;

  //________________strings fields_______________
  @Prop({ type: String, required: true, trim: true })
  name: string;

  @Prop({ type: String, required: true, trim: true })
  description: string;

  @Prop({ type: String, required: true, trim: true, unique: true })
  slug: string;
  //________________ids fields_______________
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Category',
    required: true,
    trim: true,
  })
  categoryId: Types.ObjectId;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Brand',
    required: true,
    trim: true,
  })
  brandId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true, trim: true })
  createdBy: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true, trim: true })
  updatedBy: Types.ObjectId;
  //________________Numbers fields_______________

  @Prop({ type: Number, required: true, min: 1 })
  price: number;

  @Prop({ type: Number, default: 0, min: 0 })
  discountAmount: number;

  @Prop({
    type: String,
    enum: DISCOUNT_TYPE,
    default: DISCOUNT_TYPE.fixed_amount,
  })
  disCountType: DISCOUNT_TYPE;

  @Virtual({
    get: function (this: Product) {
      let final =
        this.disCountType === DISCOUNT_TYPE.fixed_amount
          ? this.price - this.discountAmount
          : this.price - (this.price * this.discountAmount) / 100;

      return Math.max(final, 0);
    },
  })
  finalPrice: number; // virtual

  @Prop({ type: Number, default: 0, min: 0 })
  stock: number;

  @Prop({ type: Number, default: 0, min: 0 })
  sold: number;
  //______________________specification_______________________//
  @Prop({ type: [String] })
  colors: string[];

  @Prop({ type: [String] })
  sizes: string[];
  //______________________images_______________________//
  @Prop({
    type: [
      {
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
  })
  images: {
    secure_url: string;
    public_id: string;
  }[];
  //______________________status_______________________//
  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const productSchema = SchemaFactory.createForClass(Product);
productSchema.index({ name: 'text' });
productSchema.index({ price: 1 });
productSchema.index({ categoryId: 1 });
productSchema.index({ brandId: 1 });
productSchema.index({ isActive: 1 });
