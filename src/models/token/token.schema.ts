import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { TOKEN_TYPE } from 'src/common';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Token {
  @Prop({ type: String, required: true })
  token: string;

  @Prop({ type: String, enum: TOKEN_TYPE, required: true })
  type: string;
  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
  user: Types.ObjectId;

  @Prop({
    type: Date,
    expires: 0, // TTL index auto-deletion
    required: true,
  })
  expiresAt: Date;
}

export const tokenSchema = SchemaFactory.createForClass(Token);
