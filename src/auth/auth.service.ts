import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { comparePassword } from 'src/shared/hash';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDTO, UserResDTO } from 'src/user/dto/user.dto';
import { UserRepository } from 'src/user/user.repository';
import { Payload } from 'src/shared/jwt/jwt.payload';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) {}

    public async login(loginUserDto: LoginUserDTO): Promise<UserResDTO> {
        const user = await this.userRepository.findOneUserByEmail(loginUserDto.email);
        if(!user) throw new NotFoundException('Phone number Not found');
        
        const isValid = comparePassword(user.password, loginUserDto.password);
        if(!isValid) {
            throw new UnauthorizedException();
        }

        const payload: Payload = { id: user.user_id }
        const token = this.jwtService.sign(payload);
        
        return { id: user.user_id, access_token: token };
    }
}
