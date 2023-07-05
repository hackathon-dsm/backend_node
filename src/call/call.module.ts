import { Module } from '@nestjs/common';
import { CallService } from './call.service';
import { CallController } from './call.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Call } from 'src/entities/call.entity';
import { CallRepository } from './call.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Call]),
  ],
  controllers: [CallController],
  providers: [CallService, CallRepository]
})
export class CallModule {}
