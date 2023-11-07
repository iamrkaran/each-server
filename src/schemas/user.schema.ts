import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PostEntity } from 'src/posts/post.entity/post.entity';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ default: '' })
  bio: string;

  @Prop({ default: '' })
  website: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  picture: string;

  @Prop({ default: Date.now })
  createdDate: Date;

  @Prop([{ username: String, changedDate: { type: Date, default: Date.now } }])
  usernameChanges: Array<{ username: string; changedDate: Date }>;

  @Prop()
  followers: Array<User>;

  @Prop()
  following: Array<User>;

  @Prop([{ type: Types.ObjectId, ref: 'Post' }])
  savedPosts: Array<PostEntity>;

  @Prop({ default: false })
  isOAuthUser: boolean;

  @Prop({ default: false })
  isOnBoardingCompleted: boolean;

  @Prop({ default: false })
  isVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
