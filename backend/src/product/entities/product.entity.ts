import { IsNotEmpty } from "class-validator"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Category } from "../../category/entities/category.entity"
import { User } from "../../user/entities/user.entity"

@Entity({ name: "tb_product" })
export class Product {

  @PrimaryGeneratedColumn()
  id: number

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  name: string

  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  description: string

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number

  @Column({ type: 'integer', nullable: false })
  quantity: number

  @ManyToOne(() => Category, (category) => category.product, {
    onDelete: "CASCADE"
  })
  category: Category

  @ManyToOne(() => User, (user) => user.product, {
    onDelete: "CASCADE"
  })
  user: User
}