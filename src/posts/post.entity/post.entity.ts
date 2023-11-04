import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class PostEntity extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  caption: string;

  @Prop({ required: true })
  image: string;

  @Prop({ default: Date.now })
  createdDate: Date;

  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  likes: Types.ObjectId[];

  @Prop([
    {
      user: { type: Types.ObjectId, ref: 'User' },
      text: String,
      createdDate: { type: Date, default: Date.now },
    },
  ])
  comments: Array<{
    user: Types.ObjectId;
    text: string;
    createdDate: Date;
  }>;
}

export const PostSchema = SchemaFactory.createForClass(PostEntity);
