import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsMongoId() 
  userId: string;

  @IsNotEmpty()
  @IsMongoId() 
  postId: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
