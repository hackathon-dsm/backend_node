import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Way } from "src/entities/way.entity";
import { Repository } from "typeorm";
import { WayDTO } from "./dto/way.dto";
import { User } from "src/entities/user.entity";

@Injectable()
export class WayRepository {
    constructor(
        @InjectRepository(Way)
        private readonly wayRepository: Repository<Way>
    ) {}

    async setWay(wayDto: WayDTO, user: User) {
        const way = new Way();

        way.departure = wayDto.departure;
        way.destination = wayDto.destination;
        way.user_id = user.user_id;

        return await this.wayRepository.save(way);
    }
}