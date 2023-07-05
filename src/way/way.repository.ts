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
        private readonly wayRepository: Repository<Way>,
    ) {}

    async setWay(wayDto: WayDTO, user: User) {
        const way = new Way();

        way.departure = wayDto.departure;
        way.destination = wayDto.destination;
        way.visitor_id = user.user_id;

        return await this.wayRepository.save(way);
    }

    async acceptTaxi(way_id: number, user: User) {
        return await this.wayRepository.createQueryBuilder('way')
            .update(Way)
            .set({ taxi_id: user.user_id })
            .where('way_id = :way_id', { way_id })
            .execute();
    }

    async getOneWay(way_id: number): Promise<Way> {
        return await this.wayRepository.createQueryBuilder('way')
            .select('way.way_id')
            .addSelect('way.departure')
            .addSelect('way.destination')
            .addSelect('way.visitor_id')
            .addSelect('way.taxi_id')
            .addSelect('user.name')
            .addSelect('taxi.name')
            .addSelect('taxi.phone')
            .addSelect('way.created_at')
            .addSelect('way.updated_at')
            .innerJoin('way.user', 'user')
            .leftJoin('way.taxi', 'taxi')
            .where('way.way_id = :way_id', { way_id })
            .getRawOne();
    }
}