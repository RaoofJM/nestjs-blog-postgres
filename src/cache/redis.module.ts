import { Module } from '@nestjs/common';
import { PostCacheRepository } from './repository/postCache.repository';

@Module({
  providers: [PostCacheRepository],
  exports: [PostCacheRepository],
})
export class CacheModule {}
