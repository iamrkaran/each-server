import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostEntity, PostSchema } from './post.entity/post.entity';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PostEntity.name, schema: PostSchema }]),
  ],
  controllers: [PostsController],
  providers: [PostsService, AwsS3Service],
})
export class PostsModule {}
