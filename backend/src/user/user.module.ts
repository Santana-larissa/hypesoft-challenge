import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { UserController } from './controller/user.controller';
import { User } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { Bcrypt } from '../auth/bcrypt/bcrypt';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        forwardRef(() => AuthModule),
    ],
    providers: [UserService, Bcrypt],
    controllers: [UserController],
    exports: [TypeOrmModule, UserService],
})
export class UserModule { }

