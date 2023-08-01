import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PostRepository } from './post.respository';
import { CreatePostDto } from './dto/createPost.dto';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/user.interface';
import { UpdatePostDto } from './dto/updatePost.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(data: CreatePostDto, user: User) {
    const post = await this.postRepository.create({
      title: data.title,
      tags: data.tags,
      content: data.content,
      userId: user.id,
    });
    return post;
  }

  async findOne(id: number, user: User) {
    const post = await this.postRepository.findOne(id);
    if (!post) throw new NotFoundException('No post found');

    const isAdmin = user.role.includes('ADMIN');
    console.log(user);

    if (user.id !== post.userId && !isAdmin)
      throw new UnauthorizedException(
        "You don't have enough access to this post",
      );

    return post;
  }

  async findMany(user: User) {
    const isAdmin = user.role.includes('ADMIN');

    if (!isAdmin)
      throw new UnauthorizedException(
        "You don't have enough access to all the posts",
      );

    return await this.postRepository.findAll();
  }

  async delete(id: number, user: User) {
    const post = await this.postRepository.findOne(id);
    if (!post) throw new NotFoundException('No post found');

    const isAdmin = user.role.includes('ADMIN');

    if (user.id !== post.userId && !isAdmin)
      throw new UnauthorizedException(
        "You don't have enough access to this posts",
      );

    return await this.postRepository.delete(id);
  }

  async update(id: number, data: UpdatePostDto, user: User) {
    const post = await this.postRepository.findOne(id);
    if (!post) throw new NotFoundException('No post found');

    const isAdmin = user.role.includes('ADMIN');

    if (user.id !== post.userId && !isAdmin)
      throw new UnauthorizedException(
        "You don't have enough access to this posts",
      );

    return await this.postRepository.update(id, data);
  }
}
