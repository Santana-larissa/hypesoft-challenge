import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "../../product/entities/product.entity"

@Entity({ name: "tb_user" })
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    name: string

    @IsEmail()
    @Column({ length: 255, nullable: false, unique: true })
    email: string

    @IsNotEmpty()
    @MinLength(8)
    @Column({ length: 255, nullable: false })
    password: string

    @Column({ length: 5000, nullable: true })
    photo: string

}