import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

function isUniqueViolation(err: any) {
    return err?.code === 'ER_DUP_ENTRY' || err?.driverError?.code === 'ER_DUP_ENTRY' || err?.errno === 1062;
}

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private bcrypt: Bcrypt
    ) { }

    async findByUser(email: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: {
                email: email
            }
        })
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();

    }

    async findById(id: number): Promise<User> {

        const user = await this.userRepository.findOne({
            where: {
                id
            }
        });

        if (!user)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return user;

    }

    async create(user: User): Promise<User> {

        const searchUser = await this.findByUser(user.email);

        if (searchUser)
            throw new HttpException("O Usuario já existe!", HttpStatus.BAD_REQUEST);

        user.password = await this.bcrypt.encryptPassword(user.password)
        return await this.userRepository.save(user);

    }

    async update(id: number, data: Partial<User>): Promise<User> {

        if (data.email) data.email = data.email.trim().toLowerCase();
        if (data.password) data.password = await this.bcrypt.encryptPassword(data.password);

        try {
            await this.userRepository.update({ id }, data);
            return this.userRepository.findOneByOrFail({ id });
        } catch (err) {
            if (isUniqueViolation(err)) throw new ConflictException('E-mail já existe');
            throw err;
        }

    }

    async delete(id: number): Promise<void> {
        const user = await this.findById(id);
        await this.userRepository.remove(user);
    }
}