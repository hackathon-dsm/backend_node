import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { WayService } from './way.service';
import { AuthGuard } from '@nestjs/passport';
import { WayDTO } from './dto/way.dto';
import { Request } from 'express';
import { User } from 'src/entities/user.entity';

@Controller('way')
export class WayController {
  constructor(private readonly wayService: WayService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  public async setWay(
    @Body() wayDto: WayDTO,
    @Req() req: Request
  ) {
    return await this.wayService.setWay(wayDto, req.user as User);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/:way_id')
  public async acceptTaxi(
    @Param('way_id') way_id: number,
    @Req() req: Request
  ) {
    return await this.wayService.acceptTaxi(way_id, req.user as User);
  }

  @Get('/:way_id')
  public async getOneWay(
    @Param('way_id') way_id: number 
  ) {
    return await this.wayService.getOneWay(way_id);
  }

  @Get('/')
  public async getAllWay() {
    return await this.wayService.getAllWay();
  }

  @Patch('/:way_id')
  public async cancelWay(
    @Param('way_id') way_id: number
  ) {
    await this.wayService.cacnelWay(way_id);

    return { statusCode: 200, message: 'update Success' };
  }
}
