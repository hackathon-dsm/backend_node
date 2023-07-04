import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config/ormconfig';
import { WayModule } from 'src/way/way.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    AuthModule,
    WayModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
