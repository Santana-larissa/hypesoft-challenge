import { Controller, Get, Post, Put, Delete, HttpCode, HttpStatus, Param, Body, HttpException, UseGuards, ParseIntPipe } from "@nestjs/common";
import { ProductService } from "../services/product.service";
import { Product } from "../entities/product.entity";

@Controller("/products")
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.findById(id);
  }

  @Get('/name/:name')
  @HttpCode(HttpStatus.OK)
  findAllByName(@Param('name') name: string): Promise<Product[]> {
    return this.productService.findAllByName(name);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() product: Product): Promise<Product> {
    return this.productService.create(product);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<Product>): Promise<Product> {
    return this.productService.update(id, data);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }

}