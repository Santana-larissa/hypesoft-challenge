import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserLogin } from '../entities/userlogin.entity';
import { UserService } from '../../user/services/user.service';
import { Bcrypt } from '../bcrypt/bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ) { }

    async validateUser(email: string, password: string): Promise<any> {

        const findUser = await this.userService.findByEmail(email)

        if (!findUser)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)

        const matchPassword = await this.bcrypt.comparePassword(password, findUser.password)

        if (findUser && matchPassword) {
            const { password, ...response } = findUser
            return response
        }

        return null

    }

    async login(user: any) {
        const payload = { sub: user.id, email: user.email };
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            photo: user.photo ?? null,
            token: `Bearer ${await this.jwtService.signAsync(payload)}`,
        };
    }
}
