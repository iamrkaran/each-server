import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { MediaModule } from './media/media.module';
import { LikesCommentsModule } from './likes-comments/likes-comments.module';
import { FeedModule } from './feed/feed.module';
import { RelationshipsModule } from './relationships/relationships.module';
import { ExploreModule } from './explore/explore.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    UsersModule,
    PostsModule,
    MediaModule,
    LikesCommentsModule,
    FeedModule,
    RelationshipsModule,
    ExploreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
