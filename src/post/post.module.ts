import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { PostRepository } from './post.respository';
import { CacheModule } from 'src/cache/redis.module';

@Module({
  providers: [PostService, PostRepository],
  controllers: [PostController],
  imports: [PrismaModule, UserModule, CacheModule],
  exports: [PostRepository],
})
export class PostModule {}
