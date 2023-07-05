import { Injectable } from '@nestjs/common';
import { CallRepository } from './call.repository';
import { CallDTO } from './dto/call.dto';
import { User } from 'src/entities/user.entity';
import { Call } from 'src/entities/call.entity';

@Injectable()
export class CallService {
    constructor(
        private readonly callRepository: CallRepository
    ) {}

    public async setCall(callDto: CallDTO, user: User): Promise<Call> {
        return await this.callRepository.setCall(callDto, user);
    }

    public async acceptTaxi(call_id: number, user: User): Promise<Call> {
        await this.callRepository.acceptTaxi(call_id, user);

        return await this.callRepository.getOneCall(call_id);
    }

    public async getOneCall(call_id: number): Promise<Call> {
        return await this.callRepository.getOneCall(call_id);
    }

    public async getAllCall(): Promise<Call[]> {
        return await this.callRepository.getAllCall();
    }

    public async cancelCall(call_id: number) {
        return await this.callRepository.cancelCall(call_id);
    }

    public async getMyCall(user: User): Promise<Call[]> {
        return await this.callRepository.getMyCall(user.user_id);
    }
}