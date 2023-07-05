import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO, UserResDTO } from 'src/user/dto/user.dto';

@Controller('user')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('/login')
    async login(
        @Body() loginUserDto: LoginUserDTO
    ): Promise<UserResDTO> {
        return this.authService.login(loginUserDto);
    }
}
