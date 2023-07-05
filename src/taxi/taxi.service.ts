import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { generateHash } from 'src/shared/hash';
import { TaxiRepository } from './taxi.repository';
import { CreateTaxiDTO } from './dto/taxi.dto';
import { Taxi } from 'src/entities/taxi.entity';

@Injectable()
export class TaxiService {
    constructor(
        private readonly taxiRepository: TaxiRepository,
    ) {}
    
    public async signUp(createTaxiDto: CreateTaxiDTO): Promise<Taxi> {
        const taxi = await this.taxiRepository.findOneTaxiByEmail(createTaxiDto.email);
        
        if(taxi) throw new ConflictException('email already exists');
        
        const hashedPassword = generateHash(createTaxiDto.password);
        const newCreateTaxiDto: CreateTaxiDTO = { ...createTaxiDto, password: hashedPassword };

        return await this.taxiRepository.createTaxi(newCreateTaxiDto);
    }

    public async getOneTaxiById(taxi_id: number): Promise<Taxi> {
        const taxi =  await this.taxiRepository.getOneTaxiById(taxi_id);

        if(!taxi) throw new NotFoundException('Not Found taxi');

        return taxi;
    }
}
