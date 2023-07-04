import { Test, TestingModule } from '@nestjs/testing';
import { WayController } from './way.controller';
import { WayService } from './way.service';

describe('WayController', () => {
  let controller: WayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WayController],
      providers: [WayService],
    }).compile();

    controller = module.get<WayController>(WayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
