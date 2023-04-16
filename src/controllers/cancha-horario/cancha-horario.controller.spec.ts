import { Test, TestingModule } from '@nestjs/testing';
import { CanchaHorarioController } from './cancha-horario.controller';

describe('CanchaHorarioController', () => {
  let controller: CanchaHorarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CanchaHorarioController],
    }).compile();

    controller = module.get<CanchaHorarioController>(CanchaHorarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
