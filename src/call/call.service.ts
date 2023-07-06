import { Injectable } from '@nestjs/common';
import { CallRepository } from './call.repository';
import { CallDTO } from './dto/call.dto';
import { User } from 'src/entities/user.entity';
import { Call } from 'src/entities/call.entity';
import { ForbiddenError, NotFoundError } from 'src/shared/exception';
import { Taxi } from 'src/entities/taxi.entity';

@Injectable()
export class CallService {
    constructor(
        private readonly callRepository: CallRepository
    ) {}

    public async setCall(callDto: CallDTO, user: User): Promise<Call> {
        return await this.callRepository.setCall(callDto, user);
    }

    public async acceptTaxi(call_id: number, user: Taxi): Promise<Call> {
        await this.callRepository.acceptTaxi(call_id, user.taxi_id);

        const call = await this.callRepository.getOneCall(call_id);
        if(!call) throw new NotFoundError('Not Found Call');
        
        return call;
    }

    public async getOneCall(call_id: number): Promise<Call> {
        const call = await this.callRepository.getOneCall(call_id);
        
        if(!call) throw new NotFoundError('Not Found Call');
        return call;
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

    public async deleteCall(call_id: number, user: User) {
        const call = await this.callRepository.getOneCall(call_id);
        
        if(!call) throw new NotFoundError('Not Found Call');

        if(call.visitor_id == user.user_id) return await this.callRepository.deleteCall(call_id);
        else throw new ForbiddenError();
    }
}