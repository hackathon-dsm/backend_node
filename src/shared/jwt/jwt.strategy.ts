import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "src/entities/user.entity";
import { UnAuthorizedError } from "../exception";
import { Payload } from "./jwt.payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_KEY,
            ignoreExpiration: false
        });
    }

    async validate(payload: Payload) {
        const user = await this.userRepository.findOne({
            where: { user_id: payload.id }
        });

        if(user) {
            return user;
        } else {
            throw new UnAuthorizedError;
        }
    }
}