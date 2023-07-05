import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CallService } from './call.service';
import { AuthGuard } from '@nestjs/passport';
import { CallDTO } from './dto/call.dto';
import { Request } from 'express';
import { User } from 'src/entities/user.entity';

@Controller('call')
export class CallController {
  constructor(private readonly CallService: CallService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  public async setCall(
    @Body() callDto: CallDTO,
    @Req() req: Request
  ) {
    return await this.CallService.setCall(callDto, req.user as User);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/:call_id')
  public async acceptTaxi(
    @Param('call_id') call_id: number,
    @Req() req: Request
  ) {
    return await this.CallService.acceptTaxi(call_id, req.user as User);
  }

  @Get('/:call_id')
  public async getOneCall(
    @Param('call_id') call_id: number 
  ) {
    return await this.CallService.getOneCall(call_id);
  }

  @Get('/')
  public async getAllCall() {
    return await this.CallService.getAllCall();
  }

  @Patch('/:call_id')
  public async cancelCall(
    @Param('call_id') call_id: number
  ) {
    await this.CallService.cacnelCall(call_id);

    return { statusCode: 200, message: 'update Success' };
  }
}
