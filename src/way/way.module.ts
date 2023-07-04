import { Module } from '@nestjs/common';
import { WayService } from './way.service';
import { WayController } from './way.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Way } from 'src/entities/way.entity';
import { WayRepository } from './way.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Way]),
  ],
  controllers: [WayController],
  providers: [WayService, WayRepository]
})
export class WayModule {}
