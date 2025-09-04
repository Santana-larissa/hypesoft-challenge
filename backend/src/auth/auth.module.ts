import { forwardRef, Module } from "@nestjs/common";
import { Bcrypt } from "./bcrypt/bcrypt";
import { UserModule } from "../user/user.module";

@Module({
    imports: [
        forwardRef(() => UserModule)
    ],
    providers: [Bcrypt],
    exports: [Bcrypt],
})
export class AuthModule { }