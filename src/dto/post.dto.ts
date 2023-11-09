import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray, IsOptional, IsBase64 } from 'class-validator';
import { Types } from 'mongoose';

export class CommentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  createdDate: Date;
}
export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user:Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  caption: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBase64()
  imageUrl:string;
}

export class UpdatePostDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  user: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  caption: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  imageUrls: string[];

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  likes: string[];

  @ApiProperty({ type: [CommentDto], required: false })
  @IsOptional()
  comments: CommentDto[];
}
