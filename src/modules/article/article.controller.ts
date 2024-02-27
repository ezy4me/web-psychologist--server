import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto, UpdateArticleDto } from './dto';
import { Article } from '@prisma/client';
import { Public } from '@common/decorators';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Public()
  @Get()
  async findAll(): Promise<Article[]> {
    return this.articleService.findAll();
  }

  @Public()
  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number): Promise<Article> {
    return this.articleService.findOneById(id);
  }

  @Post()
  async create(@Body() dto: CreateArticleDto): Promise<Article> {
    return this.articleService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateArticleDto,
  ): Promise<Article> {
    return this.articleService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Article> {
    return this.articleService.delete(id);
  }
}
