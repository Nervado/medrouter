import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionsController } from './prescriptions.controller';

describe('Prescriptions Controller', () => {
  let controller: PrescriptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrescriptionsController],
    }).compile();

    controller = module.get<PrescriptionsController>(PrescriptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
