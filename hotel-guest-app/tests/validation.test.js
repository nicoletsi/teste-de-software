import { validateGuest } from '../src/validation.js';

const validGuest = {
  name: 'John Smith',
  email: 'john@example.com',
  phone: '555123456',
  checkIn: '2026-10-10',
  checkOut: '2026-10-15',
  guests: 2,
};

describe('validateGuest', () => {
  test('aceita um hóspede válido', () => {
    expect(validateGuest(validGuest)).toBe(true);
  });

  test('rejeita nome vazio', () => {
    expect(validateGuest({ ...validGuest, name: '' })).toBe(false);
  });

  test('rejeita e-mail inválido', () => {
    expect(validateGuest({ ...validGuest, email: 'johnexample.com' })).toBe(false);
  });

  test('rejeita check-out anterior ao check-in', () => {
    expect(validateGuest({ ...validGuest, checkOut: '2026-10-09' })).toBe(false);
  });

  test('rejeita número de hóspedes igual a zero', () => {
    expect(validateGuest({ ...validGuest, guests: 0 })).toBe(false);
  });

  test('exige nome com pelo menos três caracteres', () => {
    expect(validateGuest({ ...validGuest, name: 'Jo' })).toBe(false);
  });
});
