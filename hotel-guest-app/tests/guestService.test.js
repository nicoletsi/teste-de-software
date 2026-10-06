import { GuestService } from '../src/guestService.js';

const guestData = {
  name: 'John Smith',
  email: 'john@example.com',
  phone: '555123456',
  checkIn: '2026-10-10',
  checkOut: '2026-10-15',
  guests: 2,
};

describe('GuestService', () => {
  test('registra e retorna um hóspede', () => {
    const service = new GuestService();
    const guest = service.create(guestData);

    expect(guest.id).toBe(1);
    expect(guest.name).toBe('John Smith');
    expect(guest.status).toBe('registered');
    expect(service.list()).toHaveLength(1);
  });

  test('impede duplicidade de e-mail', () => {
    const service = new GuestService();
    service.create(guestData);

    expect(() => service.create({ ...guestData, name: 'Outra Pessoa' }))
      .toThrow('O e-mail já está cadastrado.');
  });

  test('localiza um hóspede por id', () => {
    const service = new GuestService();
    const guest = service.create(guestData);

    expect(service.findById(guest.id)).toEqual(guest);
    expect(service.findById(999)).toBeUndefined();
  });
});
