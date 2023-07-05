import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TaxiService } from './taxi.service';
import { CreateTaxiDTO } from './dto/taxi.dto';

@Controller('taxi')
export class TaxiController {
    constructor(
        private readonly taxiService: TaxiService
    ) {}

    @Post('/')
    async signUp(
        @Body() createTaxiDto: CreateTaxiDTO,
    ) {
        await this.taxiService.signUp(createTaxiDto);
        return { statusCode: 201, message: 'Success Sign up' };
    }

    @Get('/:taxi_id')
    async getOneTaxiById(
        @Param('taxi_id') taxi_id: number
    ) {
        return await this.taxiService.getOneTaxiById(taxi_id);
    }
}
