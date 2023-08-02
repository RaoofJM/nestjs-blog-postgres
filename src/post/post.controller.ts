import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/guard/jwtAuth.guard';
import { User } from 'src/user/user.interface';
import { FindAllPostDto } from './dto/findAll.dto';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/all')
  async getPosts(@Body() body: FindAllPostDto, @Request() req) {
    const user = req.user as User;
    const page = body.page ? parseInt(body.page.toString()) : 1;
    const limit = body.limit ? parseInt(body.limit.toString()) : 5;

    const posts = await this.postService.findMany({ page, limit }, user);
    return posts;
  }

  @Get('/:id')
  async getPost(@Param('id', ParseIntPipe) id, @Request() req) {
    const user = req.user as User;
    const post = await this.postService.findOne(id, user);
    return post;
  }

  @Post('/create')
  async createPost(@Body() body: CreatePostDto, @Request() req) {
    const user = req.user as User;
    const post = await this.postService.create(body, user);
    return post;
  }

  @Put('/update/:id')
  async updatePost(
    @Body() bdoy: UpdatePostDto,
    @Param('id', ParseIntPipe) id,
    @Request() req,
  ) {
    const user = req.user as User;
    const updatedPost = await this.postService.update(id, bdoy, user);
    return updatedPost;
  }

  @Delete('/delete/:id')
  async deletePost(@Param('id', ParseIntPipe) id, @Request() req) {
    const user = req.user as User;
    const post = await this.postService.delete(id, user);
    return post;
  }
}
