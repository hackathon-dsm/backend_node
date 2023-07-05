import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
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

  @Get('/:way_id')
  public async getOneWay(
    @Param('way_id') way_id: number 
  ) {
    return await this.wayService.getOneWay(way_id);
  }
}
