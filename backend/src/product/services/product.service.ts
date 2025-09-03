import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Product } from "../entities/product.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: {
      }
    });
  }

  async findById(id: number): Promise<Product> {

    const product = await this.productRepository.findOne({
      where: {
        id
      },
      relations: {
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
      }
    })
  }

  async create(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async update(product: Product): Promise<Product> {

    await this.findById(product.id);
    return await this.productRepository.save(product);

  }

  async delete(id: number): Promise<DeleteResult> {

    await this.findById(id);

    return await this.productRepository.delete(id);

  }

}