import { Comment } from 'src/comment/comment.interface';
import { Post } from 'src/post/post.interface';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role?: string[];
  posts?: Post[];
  comments?: Comment[];
  createdAt: Date;
  updatedAt?: Date;
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
