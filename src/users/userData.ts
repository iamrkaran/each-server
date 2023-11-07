
import { PostEntity } from 'src/posts/post.entity/post.entity';
import { User } from 'src/schemas/user.schema';

export type UserResponse = {
  name: string;
  username: string;
  bio: string;
  website: string;
  email: string;
  picture: string;
  followers: Array<User>;
  following: Array<User>;
  accessToken: string;
  createdDate: Date;
  usernameChanges: Array<{ username: string; changedDate: Date }>;
  savedPosts: Array<PostEntity>;
  isOAuthUser: boolean;
  isOnBoardingCompleted: boolean;
  isVerified: boolean;
};
