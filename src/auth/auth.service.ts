import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { comparePassword } from 'src/shared/hash';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDTO, UserResDTO } from 'src/user/dto/user.dto';
import { UserRepository } from 'src/user/user.repository';
import { Payload } from 'src/shared/jwt/jwt.payload';
import { TaxiRepository } from 'src/taxi/taxi.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly taxiRepository: TaxiRepository,
        private readonly jwtService: JwtService,
    ) {}

    public async login(loginUserDto: LoginUserDTO): Promise<UserResDTO> {
        const user = await this.userRepository.findOneUserByEmail(loginUserDto.email);
        const taxi = await this.taxiRepository.findOneTaxiByEmail(loginUserDto.email);

        if(!user && !taxi) throw new NotFoundException('Email Not found');
        
        if(user) {
            const isValid = comparePassword(user.password, loginUserDto.password);
            if(!isValid) {
                throw new UnauthorizedException();
            }

            const payload: Payload = { id: user.user_id, kind: 'USER' };
            const token = this.jwtService.sign(payload);

            return { id: user.user_id, access_token: token };

        } else if(taxi) {
            const isValid = comparePassword(taxi.password, loginUserDto.password);
            if(!isValid) {
                throw new UnauthorizedException();
            }

            const payload: Payload = { id: taxi.taxi_id, kind: 'TAXI' };
            const token = this.jwtService.sign(payload);

            return { id: taxi.taxi_id, access_token: token };
        }
    }
}
