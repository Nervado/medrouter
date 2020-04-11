import { PrescriptionRepository } from './prescription.repository';

describe('PrescriptionRepository', () => {
  it('should be defined', () => {
    expect(new PrescriptionRepository()).toBeDefined();
  });
});
