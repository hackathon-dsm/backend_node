import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post('/')
    async signUp(
        @Body() createUserDto: CreateUserDTO,
    ) {
        await this.userService.signUp(createUserDto);
        return { statusCode: 201, message: 'Success Sign up' };
    }

    @Get('/:user_id')
    async getOneUserById(
        @Param('user_id') user_id: number
    ) {
        return await this.userService.getOneUserById(user_id);
    }
}
