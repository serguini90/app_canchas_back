import { Test, TestingModule } from '@nestjs/testing';
import { ListaMedioPagoController } from './lista-medio-pago.controller';

describe('ListaMedioPagoController', () => {
  let controller: ListaMedioPagoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListaMedioPagoController],
    }).compile();

    controller = module.get<ListaMedioPagoController>(ListaMedioPagoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
