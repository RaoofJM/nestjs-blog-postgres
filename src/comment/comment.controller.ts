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
import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/guard/jwtAuth.guard';
import { User } from 'src/user/user.interface';

@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get('/all')
  async getComments(@Request() req) {
    const user = req.user as User;
    const comments = await this.commentService.findMany(user);
    return comments;
  }

  @Get('/:id')
  async getComment(@Param('id', ParseIntPipe) id, @Request() req) {
    const user = req.user as User;
    const comment = await this.commentService.findOne(id, user);
    return comment;
  }

  @Post('/create')
  async createComment(@Body() body: CreateCommentDto, @Request() req) {
    const user = req.user as User;
    body.postId = parseInt(body.postId.toString());
    const comment = await this.commentService.create(body, user);
    return comment;
  }

  @Put('/update/:id')
  async updateComment(
    @Body() bdoy: UpdateCommentDto,
    @Param('id', ParseIntPipe) id,
    @Request() req,
  ) {
    const user = req.user as User;
    const updatedComment = await this.commentService.update(id, bdoy, user);
    return updatedComment;
  }

  @Delete('/delete/:id')
  async deleteComment(@Param('id', ParseIntPipe) id, @Request() req) {
    const user = req.user as User;
    const comment = await this.commentService.delete(id, user);
    return comment;
  }
}
