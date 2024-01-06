// like.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Like } from './entities/like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(Like.name) private readonly likeModel: Model<Like & Document>,
  ) {}

  async create(like: Like): Promise<Like> {
    // Check if the user has already liked the post
    const existingLike = await this.likeModel
      .findOne({ userId: like.userId, postId: like.postId })
      .exec();

    if (!existingLike) {
      const newLike = new this.likeModel(like);
      return newLike.save();
    }

    await this.likeModel.findByIdAndDelete(existingLike._id).exec();
  }

  async findAll(postId: string): Promise<Like[]> {
    return this.likeModel.find({ postId }).exec();
  }

  async findAllByIds(postIds: string[]): Promise<Like[]> {
    // Fetch all likes for the specified postIds
    const likes = await this.likeModel.find({ postId: { $in: postIds } }).exec();
    
    // Filter likes based on postIds
    return likes.filter((like) => postIds.includes(like.postId.toString()));
  }

}
