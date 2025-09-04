import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";
import { IsNotEmpty } from "class-validator"

@Entity({ name: "tb_category" })
export class Category {

  @PrimaryGeneratedColumn()
  id: number

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  name: string

  @OneToMany(() => Product, (product) => product.category)
  product: Product[]
}

