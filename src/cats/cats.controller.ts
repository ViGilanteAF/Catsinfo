import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CatRequestDto } from './dto/cats.request.dto';
import { CatsService } from './cats.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadonlyCatDto } from './dto/cat.dto';

@Controller('cats')
@UseInterceptors()
@UseFilters()
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({ summary: '현재 저장되어 있는 고양이 로딩' })
  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @ApiResponse({
    status: 500,
    description: 'Server error',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ReadonlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    console.log(body);
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn() {
    return 'login';
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logout() {
    return 'logout';
  }

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadCatImg';
  }
}
