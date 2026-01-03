import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Categorty {
  readonly _id: Types.ObjectId;

  @Prop({ type: String, required: true, unique: true, trim: true })
  name: string;

  @Prop({ type: String, required: false, trim: true })
  description: string;

  @Prop({ type: String, required: true, unique: true, trim: true })
  slug: string;
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy: Types.ObjectId;
  @Prop({ type: Boolean, default: true })
  isActive: boolean;
  @Prop({
    type: {
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    required: true,
  })
  logo: {
    secure_url: string;
    public_id: string;
  };
}

export const categorySchema = SchemaFactory.createForClass(Categorty);
categorySchema.index({ name: 1 });
categorySchema.index({ isActive: 1, createdAt: -1 });
