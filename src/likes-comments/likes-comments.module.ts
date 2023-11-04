import { Module } from '@nestjs/common';
import { LikesCommentsController } from './likes-comments.controller';
import { LikesCommentsService } from './likes-comments.service';

@Module({
  controllers: [LikesCommentsController],
  providers: [LikesCommentsService]
})
export class LikesCommentsModule {}
