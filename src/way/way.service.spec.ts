import { Test, TestingModule } from '@nestjs/testing';
import { WayService } from './way.service';

describe('WayService', () => {
  let service: WayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WayService],
    }).compile();

    service = module.get<WayService>(WayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
