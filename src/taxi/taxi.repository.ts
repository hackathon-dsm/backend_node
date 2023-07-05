import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";;
import { Taxi } from "src/entities/taxi.entity";
import { CreateTaxiDTO } from "src/user/dto/user.dto";

@Injectable()
export class TaxiRepository {
    constructor(
        @InjectRepository(Taxi)
        private readonly taxiRepository: Repository<Taxi>
    ) {}

    async createTaxi(createTaxiDto: CreateTaxiDTO): Promise<Taxi> {
        const taxi = new Taxi();

        taxi.name = createTaxiDto.name;
        taxi.email = createTaxiDto.email;
        taxi.password = createTaxiDto.password;
        taxi.car_number = createTaxiDto.car_number;
        taxi.phone = createTaxiDto.phone;

        return await this.taxiRepository.save(taxi);
    }

    async findOneTaxiByEmail(email: string): Promise<Taxi> {
        return await this.taxiRepository.findOne({ where: { email } });
    }

    async getOneTaxiById(taxi_id: number): Promise<Taxi> {
        return await this.taxiRepository.createQueryBuilder('taxi')
        .select('taxi.taxi_id')
        .addSelect('taxi.name')
        .addSelect('taxi.email')
        .addSelect('taxi.phone')  
        .addSelect('taxi.car_number')  
        .addSelect('taxi.created_at')
        .addSelect('taxi.updated_at')    
        .where('taxi.taxi_id = :taxi_id', { taxi_id })
        .getRawOne();
    }
}