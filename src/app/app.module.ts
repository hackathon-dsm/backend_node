import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config/ormconfig';
import { CallModule } from 'src/call/call.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    AuthModule,
    CallModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
