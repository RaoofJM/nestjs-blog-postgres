import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repositorty';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'prisma/prisma.module';
import { PostModule } from 'src/post/post.module';

@Module({
  providers: [CommentService, CommentRepository],
  controllers: [CommentController],
  imports: [PrismaModule, UserModule, PostModule],
})
export class CommentModule {}
