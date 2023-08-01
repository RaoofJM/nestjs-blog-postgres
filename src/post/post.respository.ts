// src/user.repository.ts
import { Injectable } from '@nestjs/common';
import { Post } from './post.interface'; // Import the interface
import { PrismaService } from 'prisma/prisma.service';
import { UpdatePostDto } from './dto/updatePost.dto';
import { CreatePostDto } from './dto/createPost.dto';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePostDto): Promise<Post> {
    const tags = data.tags.split(',');
    return await this.prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        tags: tags,
        userId: data.userId,
      },
    });
  }

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  async findOne(id: number): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async findByUser(userId: number): Promise<Post[]> {
    return this.prisma.post.findMany({ where: { userId } });
  }

  async update(id: number, data: UpdatePostDto): Promise<Post> {
    const tags = data.tags.split(',');
    return this.prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
        tags: tags,
      },
    });
  }

  async delete(id: number): Promise<Post> {
    return this.prisma.post.delete({ where: { id } });
  }
}
