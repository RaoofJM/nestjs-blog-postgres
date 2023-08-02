import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CommentRepository } from './comment.repositorty';
import { CreateCommentDto } from './dto/createComment.dto';
import { User } from 'src/user/user.interface';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { PostRepository } from 'src/post/post.respository';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async create(data: CreateCommentDto, user: User) {
    const post = await this.postRepository.findOne(data.postId);
    if (!post) throw new NotFoundException('PostID is not valid');

    const comment = await this.commentRepository.create({
      content: data.content,
      userId: user.id,
      postId: data.postId,
    });
    return comment;
  }

  async findOne(id: number, user: User) {
    const comment = await this.commentRepository.findOne(id);
    if (!comment) throw new NotFoundException('No comment found');

    const isAdmin = user.role.includes('ADMIN');
    console.log(user);

    if (user.id !== comment.userId && !isAdmin)
      throw new UnauthorizedException(
        "You don't have enough access to this comment",
      );

    return comment;
  }

  async findMany() {
    return await this.commentRepository.findAll();
  }

  async delete(id: number, user: User) {
    const comment = await this.commentRepository.findOne(id);
    if (!comment) throw new NotFoundException('No comment found');

    const isAdmin = user.role.includes('ADMIN');

    if (user.id !== comment.userId && !isAdmin)
      throw new UnauthorizedException(
        "You don't have enough access to this comments",
      );

    return await this.commentRepository.delete(id);
  }

  async update(id: number, data: UpdateCommentDto, user: User) {
    const comment = await this.commentRepository.findOne(id);
    if (!comment) throw new NotFoundException('No comment found');

    const isAdmin = user.role.includes('ADMIN');

    if (user.id !== comment.userId && !isAdmin)
      throw new UnauthorizedException(
        "You don't have enough access to this comments",
      );

    return await this.commentRepository.update(id, data);
  }
}
