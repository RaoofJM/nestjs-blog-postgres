import { Comment } from 'src/comment/comment.interface';
import { User } from 'src/user/user.interface';

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string; // Assuming author is the name of the user
  publicationDate: Date;
  tags: string[];
  authorUser: User; // The User object representing the author
  comments?: Comment[]; // The comments field is marked as optional using "?"
  createdAt: Date;
  updatedAt: Date;
}
