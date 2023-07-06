import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { In, Repository } from "typeorm";
import { User } from "src/entities/user.entity";
import { UnAuthorizedError } from "../exception";
import { Payload } from "./jwt.payload";
import { Taxi } from "src/entities/taxi.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Taxi) private readonly taxiRepository: Repository<Taxi>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_KEY,
            ignoreExpiration: false
        });
    }

    async validate(payload: Payload) {
        if(payload.kind == 'TAXI') {
            const taxi = await this.taxiRepository.findOne({
                where: { taxi_id: payload.id }
            });
            return taxi
        } else if(payload.kind == 'USER') {
            const user = await this.userRepository.findOne({
                where: { user_id: payload.id }
            });
            return user
        } else {
            throw new UnAuthorizedError;
        }
    }
}