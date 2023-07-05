import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config/ormconfig';
import { CallModule } from 'src/call/call.module';
import { UserModule } from 'src/user/user.module';
import { TaxiModule } from 'src/taxi/taxi.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    AuthModule,
    CallModule,
    UserModule,
    TaxiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
