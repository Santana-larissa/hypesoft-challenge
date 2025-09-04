import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { User } from "../entities/user.entity";

@Controller("/users")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.userService.findById(id)
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('/sign-up')
    async create(@Body() user: User): Promise<User> {
        return await this.userService.create(user);
    }

    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<User>): Promise<User> {
        return this.userService.update(id, data);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.userService.delete(id);
    }
}