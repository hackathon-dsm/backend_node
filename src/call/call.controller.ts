import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CallService } from './call.service';
import { AuthGuard } from '@nestjs/passport';
import { CallDTO } from './dto/call.dto';
import { Request } from 'express';
import { User } from 'src/entities/user.entity';
import { Taxi } from 'src/entities/taxi.entity';

@Controller('call')
export class CallController {
  constructor(private readonly callService: CallService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  public async setCall(
    @Body() callDto: CallDTO,
    @Req() req: Request
  ) {
    return await this.callService.setCall(callDto, req.user as User);
  }

  @Get('/')
  public async getAllCall() {
    return await this.callService.getAllCall();
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:call_id')
  public async acceptTaxi(
    @Param('call_id') call_id: number,
    @Req() req: Request
  ) {
    return await this.callService.acceptTaxi(call_id, req.user as Taxi);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/my')
  public async getMyCall(
    @Req() req: Request
  ) {
    return await this.callService.getMyCall(req.user as User);
  }

  @Get('/:call_id')
  public async getOneCall(
    @Param('call_id') call_id: number 
  ) {
    return await this.callService.getOneCall(call_id);
  }

  @Patch('/:call_id/cancel')
  public async cancelCall(
    @Param('call_id') call_id: number
  ) {
    await this.callService.cancelCall(call_id);

    return { statusCode: 200, message: 'cancel Call Success' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:call_id')
  public async deleteCall(
    @Param('call_id') call_id: number,
    @Req() req: Request
  ) {
    await this.callService.deleteCall(call_id, req.user as User);

    return { statusCode: 200, message: 'delete Call Success' };
  }
}
