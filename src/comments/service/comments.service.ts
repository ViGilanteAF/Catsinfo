import { Injectable } from '@nestjs/common';
import { CommentsCreateDto } from '../dtos/commentsCreate.dto';

@Injectable()
export class CommentsService {
  async getAllComments() {
    return 'hello world';
  }

  async createComments(id: string, comments: CommentsCreateDto) {
    console.log(comments);
    return 'hello world';
  }

  async plusLike(id: string) {}
}
