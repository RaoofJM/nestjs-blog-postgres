import { Post } from 'src/post/post.interface';
import { User } from 'src/user/user.interface';

export interface Comment {
  id: number;
  content: string;
  author: string;
  post: Post;
  authorUser: User;
  createdAt: Date;
  updatedAt: Date;
}
