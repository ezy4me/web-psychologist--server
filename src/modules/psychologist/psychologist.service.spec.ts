import { Test, TestingModule } from '@nestjs/testing';
import { PsychologistService } from './psychologist.service';

describe('PsychologistService', () => {
  let service: PsychologistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PsychologistService],
    }).compile();

    service = module.get<PsychologistService>(PsychologistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
