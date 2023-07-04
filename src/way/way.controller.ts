import { Controller } from '@nestjs/common';
import { WayService } from './way.service';

@Controller('way')
export class WayController {
  constructor(private readonly wayService: WayService) {}
}
