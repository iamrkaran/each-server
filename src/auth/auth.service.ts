import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';
import { UserResponse } from 'src/users/userData';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password, username } = signUpDto;

    // Check if a user with the same email or username already exists
    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      throw new ConflictException(
        'User with the same email or username already exists',
      );
    }

    // If no existing user is found, proceed to create the new user
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      username,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<UserResponse & { accessToken: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Sign the access token
    const accessToken = this.jwtService.sign({ id: user._id });

    // Create an object with the user data, excluding the "password" field, and include the "accessToken" field
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      picture: user.picture,
      bio: user.bio,
      website: user.website,
      followers: user.followers,
      following: user.following,
      accessToken: accessToken,
      createdDate: user.createdDate,
      usernameChanges: user.usernameChanges,
      savedPosts: user.savedPosts,
      isOAuthUser: user.isOAuthUser,
      isOnBoardingCompleted: user.isOnBoardingCompleted,
      isVerified: user.isVerified,
    };

    return userData;
  }
}
