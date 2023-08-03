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
import { Roles } from 'src/decorator/role.decorator';
import { RoleGuard } from 'src/guard/role.guard';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('comment')
@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Get('/all')
  async getComments(@Request() req) {
    const comments = await this.commentService.findMany();
    return comments;
  }

  @Get('/:id')
  @ApiParam({ name: 'id', required: true })
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
  @ApiParam({ name: 'id', required: true })
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
  @ApiParam({ name: 'id', required: true })
  async deleteComment(@Param('id', ParseIntPipe) id, @Request() req) {
    const user = req.user as User;
    const comment = await this.commentService.delete(id, user);
    return comment;
  }
}
