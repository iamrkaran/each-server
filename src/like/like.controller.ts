// like.controller.ts
import { Controller, Post, Body} from '@nestjs/common';
import { LikeService } from './like.service';
import { Like } from './entities/like.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('likes')
@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a like' })
  @ApiResponse({ status: 201, description: 'The like has been successfully created.', type: Like })
  async create(@Body() like: Like): Promise<Like> {
    return this.likeService.create(like);
  }

}
