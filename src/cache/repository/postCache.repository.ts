import { Post } from 'src/post/post.interface';
import { getJson, setJson } from '../redis.query';
import { Injectable } from '@nestjs/common';
import { Key } from '../redis.keys';

@Injectable()
export class PostCacheRepository {
  async savePost(data: Post) {
    return await setJson(`${Key.POST}_${data.id}`, data, 25);
  }

  async getPost(postId: number) {
    return await getJson<Post>(`${Key.POST}_${postId}`);
  }
}
