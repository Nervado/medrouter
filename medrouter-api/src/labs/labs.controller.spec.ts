import { Test, TestingModule } from '@nestjs/testing';
import { LabsController } from './labs.controller';

describe('Labs Controller', () => {
  let controller: LabsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LabsController],
    }).compile();

    controller = module.get<LabsController>(LabsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
