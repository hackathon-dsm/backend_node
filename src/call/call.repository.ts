import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Call } from "src/entities/call.entity";
import { Repository } from "typeorm";
import { CallDTO } from "./dto/call.dto";
import { User } from "src/entities/user.entity";

@Injectable()
export class CallRepository {
    constructor(
        @InjectRepository(Call)
        private readonly callRepository: Repository<Call>,
    ) {}

    async setCall(callDto: CallDTO, user: User) {
        const call = new Call();

        call.departure = callDto.departure;
        call.destination = callDto.destination;
        call.visitor_id = user.user_id;

        return await this.callRepository.save(call);
    }

    async acceptTaxi(call_id: number, taxi_id: number) {
        return await this.callRepository.createQueryBuilder('call')
            .update(Call)
            .set({ taxi_id })
            .where('call_id = :call_id', { call_id })
            .execute();
    }

    async getOneCall(call_id: number): Promise<Call> {
        return await this.callRepository.createQueryBuilder('call')
            .select('call.call_id', 'call_id')
            .addSelect('call.departure', 'departure')
            .addSelect('call.destination', 'destination')
            .addSelect('call.visitor_id', 'visitor_id')
            .addSelect('call.taxi_id', 'taxi_id')
            .addSelect('taxi.name', 'taxi_name')
            .addSelect('taxi.phone', 'taxi_phone')
            .addSelect('user.name', 'visitor_name')
            .addSelect('user.caution', 'visitor_caution')
            .addSelect('call.created_at', 'created_at')
            .addSelect('call.updated_at', 'updated_at')
            .innerJoin('call.user', 'user')
            .leftJoin('call.taxi', 'taxi')
            .where('call.call_id = :call_id', { call_id })
            .getRawOne();
    }

    async getAllCall(): Promise<Call[]> {
        return await this.callRepository.createQueryBuilder('call')
            .select('call.call_id', 'call_id')
            .addSelect('call.departure', 'departure')
            .addSelect('call.destination', 'destination')
            .addSelect('call.visitor_id', 'visitor_id')
            .addSelect('call.taxi_id', 'taxi_id')
            .addSelect('taxi.name', 'taxi_name')
            .addSelect('taxi.phone', 'taxi_phone')
            .addSelect('user.name', 'visitor_name')
            .addSelect('user.caution', 'visitor_caution')
            .addSelect('call.created_at', 'created_at')
            .addSelect('call.updated_at', 'updated_at')
            .innerJoin('call.user', 'user')
            .leftJoin('call.taxi', 'taxi')
            .where('call.taxi_id IS NULL')
            .getRawMany();
    }

    async cancelCall(call_id:  number) {
        return await this.callRepository.createQueryBuilder('call')
            .update(Call)
            .set({ taxi_id: null })
            .where('call_id = :call_id', { call_id })
            .execute();
    }

    async getMyCall(user_id: number): Promise<Call[]> {
        return await this.callRepository.createQueryBuilder('call')
            .select('call.call_id', 'call_id')
            .addSelect('call.departure', 'departure')
            .addSelect('call.destination', 'destination')
            .addSelect('call.visitor_id', 'visitor_id')
            .addSelect('call.taxi_id', 'taxi_id')
            .addSelect('taxi.name', 'taxi_name')
            .addSelect('taxi.phone', 'taxi_phone')
            .addSelect('user.name', 'visitor_name')
            .addSelect('user.caution', 'visitor_caution')
            .addSelect('call.created_at', 'created_at')
            .addSelect('call.updated_at', 'updated_at')
            .innerJoin('call.user', 'user')
            .leftJoin('call.taxi', 'taxi')
            .where('call.visitor_id = :user_id', { user_id })
            .getRawMany();
    }

    async deleteCall(call_id: number) {
        return this.callRepository.createQueryBuilder('call')
            .delete()
            .from(Call)
            .where('call_id = :call_id', { call_id })
            .execute()
    }
}