import { AppointmentRepository } from './appointment.repository';

describe('AppointmentRepository', () => {
  it('should be defined', () => {
    expect(new AppointmentRepository()).toBeDefined();
  });
});
