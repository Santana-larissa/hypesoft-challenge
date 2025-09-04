import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { CategoryService } from "../services/category.service";
import { Category } from "../entities/category.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("/categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoryService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() Category: Category): Promise<Category> {
    return this.categoryService.create(Category);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id', ParseIntPipe) id: number,@Body() data: Partial<Category>): Promise<Category> {
    return this.categoryService.update(id, data);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.delete(id);
  }

}