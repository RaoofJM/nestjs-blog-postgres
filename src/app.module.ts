import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { throttlerConfig } from './config/throttler.config';
import { CacheModule } from './cache/redis.module';

@Module({
  imports: [
    ThrottlerModule.forRoot(throttlerConfig),
    UserModule,
    PostModule,
    CommentModule,
    AuthModule,
    CacheModule,
  ],
})
export class AppModule {}
