import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private readonly commentModel: Model<Comment>) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const newComment = new this.commentModel(createCommentDto);
    return newComment.save();
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Invalid comment ID');
    }
  
    const updatedComment = await this.commentModel.findByIdAndUpdate(id, updateCommentDto, { new: true }).exec();
  
    if (!updatedComment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  
    return updatedComment;
  }
  

  async remove(id: string): Promise<void> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Invalid comment ID');
    }
    const deletedComment = await this.commentModel.findByIdAndDelete(id).exec();
  
    if (!deletedComment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }
}
