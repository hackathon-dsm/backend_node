require('dotenv').config()

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/user/user.repository';
import { TaxiRepository } from 'src/taxi/taxi.repository';
import { Taxi } from 'src/entities/taxi.entity';
import { JwtStrategy } from 'src/shared/jwt/jwt.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
        TypeOrmModule.forFeature([User, Taxi]),
        JwtModule.register({
            secret: process.env.JWT_KEY,
            signOptions: { expiresIn: process.env.TOKEN_TIME }
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserRepository, TaxiRepository, JwtStrategy]
})
export class AuthModule {}
