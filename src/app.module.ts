import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { throttlerConfig } from './config/throttler.config';

@Module({
  imports: [
    ThrottlerModule.forRoot(throttlerConfig),
    UserModule,
    PostModule,
    CommentModule,
    AuthModule,
  ],
})
export class AppModule {}
