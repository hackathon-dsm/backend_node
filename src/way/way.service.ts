import { Injectable } from '@nestjs/common';
import { WayRepository } from './way.repository';
import { WayDTO } from './dto/way.dto';
import { User } from 'src/entities/user.entity';
import { Way } from 'src/entities/way.entity';

@Injectable()
export class WayService {
    constructor(
        private readonly wayRepository: WayRepository
    ) {}

    public async setWay(wayDto: WayDTO, user: User): Promise<Way> {
        return await this.wayRepository.setWay(wayDto, user);
    }

    public async acceptTaxi(way_id: number, user: User): Promise<Way> {
        await this.wayRepository.acceptTaxi(way_id, user);

        return await this.wayRepository.getOneWay(way_id);
    }

    public async getOneWay(way_id: number): Promise<Way> {
        return await this.wayRepository.getOneWay(way_id);
    }
}
