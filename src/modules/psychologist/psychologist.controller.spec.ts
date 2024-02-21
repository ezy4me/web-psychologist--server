import { Test, TestingModule } from '@nestjs/testing';
import { PsychologistController } from './psychologist.controller';

describe('PsychologistController', () => {
  let controller: PsychologistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PsychologistController],
    }).compile();

    controller = module.get<PsychologistController>(PsychologistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
