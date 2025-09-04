import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Product } from "../entities/product.entity";
import { CategoryService } from "../../category/services/category.service";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoryService: CategoryService
  ) { }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: {
        category: true,
        user: true
      }
    });
  }

  async findById(id: number): Promise<Product> {

    const product = await this.productRepository.findOne({
      where: {
        id
      },
      relations: {
        category: true,
        user: true
      }
    });

    if (!product)
      throw new HttpException('Produto não encontrada!', HttpStatus.NOT_FOUND);

    return product;
  }

  async findAllByName(name: string): Promise<Product[]> {
    return await this.productRepository.find({
      where: {
        name: ILike(`%${name}%`)
      },
      relations: {
        category: true,
        user: true
      }
    })
  }

  async create(product: Product): Promise<Product> {
    await this.categoryService.findById(product.category.id)
    return await this.productRepository.save(product);
  }

  async update(id: number, data: Partial<Product>): Promise<Product> {

    const product = await this.findById(id);
    if (data.category) await this.categoryService.findById(data.category.id);
    return await this.productRepository.save({ ...product, ...data });

  }

  async delete(id: number): Promise<DeleteResult> {

    await this.findById(id);

    return await this.productRepository.delete(id);

  }

}