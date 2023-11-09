import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreatePostDto } from 'src/dto/post.dto';
import { PostsService } from './posts.service';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly awsS3Service: AwsS3Service,
  ) {}

  @Get()
  async findAll() {
    const posts = await this.postsService.getPosts();
    return posts;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.getSinglePost(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiBody({
    type: CreatePostDto,
    description: 'Post creation request payload',
    required: true,
  })
  @ApiResponse({
    type: CreatePostDto,
    status: 201,
    description: 'Post created successfully',
  })
  @Post('upload')
  @ApiOperation({ summary: 'Upload a file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        user: {
          type: 'string',
        },
        caption: {
          type: 'string',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPostDto: CreatePostDto,
  ) {
    const imageUrl = await this.awsS3Service.uploadImage(
      file,
      file.originalname,
      file.mimetype,
    );

    const newPostData = {
      user: createPostDto.user,
      caption: createPostDto.caption,
      imageUrl: imageUrl, 
    };
  
  
    const newPost = await this.postsService.create(newPostData);

    return newPost;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update post by id' })
  @ApiBody({ type: CreatePostDto })
  @ApiResponse({
    status: 200,
    description: 'Post updated successfully',
  })
  async update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
    const updatedPost = await this.postsService.update(id, updatePostDto);

    if (!updatedPost) {
      throw new NotFoundException('Post not found');
    }
    return updatedPost;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.postsService.remove(id);
    return { message: 'Post deleted successfully' };
  }
}
