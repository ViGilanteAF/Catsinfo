import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CommentsCreateDto } from '../dtos/commentsCreate.dto';
import { CommentsService } from '../service/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({
    summary: '고양이 프로파일에 적힌 댓글 가지고오기!!',
  })
  @Get()
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @ApiOperation({
    summary: '특정 고양이 프로파일에 적힌 댓글 가지고오기!!',
  })
  @Post(':id')
  async createComments(
    @Param('id') id: string,
    @Body() body: CommentsCreateDto,
  ) {
    return this.commentsService.createComments(id, body);
  }

  @ApiOperation({
    summary: '따봉 숫자 증가 시키기',
  })
  @Post(':')
  async plusLike(@Param('id') id: string) {
    return this.commentsService.plusLike(id);
  }
}
