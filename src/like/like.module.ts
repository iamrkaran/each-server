import { Module } from '@nestjs/common';
import { LikeService } from './like/like.service';
import { LikeController } from './like/like.controller';

@Module({
  providers: [LikeService],
  controllers: [LikeController]
})
export class LikeModule {}
