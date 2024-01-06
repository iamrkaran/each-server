import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { LikeService } from './like.service';
import { Like } from './entities/like.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('likes')
@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a like' })
  @ApiBody({ type: Like, description: 'The like to create' })
  @ApiResponse({
    type: Like,
    status: 201,
    description: 'The like has been successfully created.',
  })
  async create(@Body() like: Like): Promise<Like> {
    return this.likeService.create(like);
  }

  // Find likes by post id
  @Get(':postId')
  @ApiOperation({ summary: 'Find likes by post id' })
  @ApiParam({ name: 'postId', type: String, description: 'Post ID' })
  @ApiResponse({
    status: 200,
    description: 'The likes have been successfully found.',
    type: [Like],
  })
  async findAll(@Param('postId') postId: string): Promise<Like[]> {
    return this.likeService.findAll(postId);
  }

  // Find likes by post ids
  @Post('likes/batch')
  @ApiOperation({ summary: 'Find likes by post ids' })
  @ApiBody({
    type: [String],
    description: 'Post IDs',
    isArray: true,
  })
  @ApiResponse({
    status: 200,
    description: 'The likes have been successfully found.',
    type: [Like],
  })
  async findAllByIds(@Body() postIds: string[]): Promise<Like[]> {
    return this.likeService.findAllByIds(postIds);
  }


}
