import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PostEntity } from './post.entity/post.entity';
import { CreatePostDto } from 'src/dto/post.dto';


import { AwsS3Service } from 'src/aws-s3/aws-s3.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostEntity.name) private postModel: Model<PostEntity>,
    private readonly awsS3Service: AwsS3Service,
  ) {}

 
  
  

  async getPosts(): Promise<PostEntity[]> {
    return this.postModel.find().exec();
  }

  async create(postData: CreatePostDto): Promise<PostEntity> {
    const newPost = new this.postModel(postData);
    return newPost.save();
  }


  async update(id: string, updatePostDto: CreatePostDto): Promise<PostEntity> {
    const updatedPost = await this.postModel
      .findByIdAndUpdate(id, updatePostDto, { new: true })
      .exec();

    if (!updatedPost) {
      throw new NotFoundException('Post not found');
    }

    return updatedPost;
  }

  async remove(id: string): Promise<void> {
    const result = await this.postModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException('Post not found');
    }
  }

  async getSinglePost(id: string): Promise<PostEntity> {
    const post = await this.postModel.findById(id).exec();

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }
}
