import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class PostEntity extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  caption: string;

  @Prop({ required: true })
  imageUrl: string; 

  @Prop({ default: Date.now })
  createdDate: Date;

  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  likes: Types.ObjectId[];
}

export const PostSchema = SchemaFactory.createForClass(PostEntity);
