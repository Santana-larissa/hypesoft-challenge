import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt {
  async encryptPassword(password: string): Promise<string> {
    const saltRounds: number = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async comparePassword(
    enteredPassword: string, //senha digitada
    storedPassword: string, //senha banco
  ): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, storedPassword);
  }
}
