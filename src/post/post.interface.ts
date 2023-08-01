import { Comment } from 'src/comment/comment.interface';
import { User } from 'src/user/user.interface';

export interface Post {
  id: number;
  title: string;
  content: string;
  tags: string[];
  user?: User;
  userId: number;
  comments?: Comment[];
  createdAt: Date;
  updatedAt?: Date;
}
