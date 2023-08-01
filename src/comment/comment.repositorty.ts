import { Injectable } from '@nestjs/common';
import { Comment } from './comment.interface'; // Import the interface
import { PrismaService } from 'prisma/prisma.service';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { CreateCommentDto } from './dto/createComment.dto';

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCommentDto): Promise<Comment> {
    return await this.prisma.comment.create({
      data,
    });
  }

  async findAll(): Promise<Comment[]> {
    return this.prisma.comment.findMany();
  }

  async findOne(id: number): Promise<Comment | null> {
    return this.prisma.comment.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async findByUser(userId: number): Promise<Comment[]> {
    return this.prisma.comment.findMany({ where: { userId } });
  }

  async update(id: number, data: UpdateCommentDto): Promise<Comment> {
    return this.prisma.comment.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Comment> {
    return this.prisma.comment.delete({ where: { id } });
  }
}
