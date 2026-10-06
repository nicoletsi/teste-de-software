import { getGuestValidationErrors } from './validation.js';

class GuestService {
  constructor() {
    this.guests = [];
    this.nextId = 1;
  }

  create(data) {
    const errors = getGuestValidationErrors(data);

    if (Object.keys(errors).length > 0) {
      const error = new Error('Os dados do hóspede são inválidos.');
      error.errors = errors;
      throw error;
    }

    const email = String(data.email).trim().toLowerCase();
    if (this.guests.some((guest) => guest.email === email)) {
      throw new Error('O e-mail já está cadastrado.');
    }

    const guest = {
      id: this.nextId++,
      name: String(data.name).trim(),
      email,
      phone: String(data.phone).trim(),
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: Number(data.guests),
      status: 'registered',
      createdAt: new Date().toISOString(),
    };

    this.guests.push(guest);
    return guest;
  }

  list() {
    return this.guests.map((guest) => ({ ...guest }));
  }

  findById(id) {
    return this.guests.find((guest) => guest.id === Number(id));
  }
}

export { GuestService };
