import { Post } from 'src/post/post.interface';
import { User } from 'src/user/user.interface';

export interface Comment {
  id: number;
  content: string;
  user?: User;
  userId: number;
  post?: Post;
  postId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
