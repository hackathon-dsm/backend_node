import { Module } from '@nestjs/common';
import { TaxiService } from './taxi.service';
import { TaxiController } from './taxi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taxi } from 'src/entities/taxi.entity';
import { TaxiRepository } from './taxi.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Taxi])
  ],
  controllers: [TaxiController],
  providers: [TaxiService, TaxiRepository]
})
export class TaxiModule {}
