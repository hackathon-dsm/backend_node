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
}
