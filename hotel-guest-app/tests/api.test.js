import request from 'supertest';

import { app } from '../server.js';

const validGuest = {
  name: 'John Smith',
  email: 'john@example.com',
  phone: '555123456',
  checkIn: '2026-10-10',
  checkOut: '2026-10-15',
  guests: 2,
};

describe('API de hóspedes', () => {
  test('POST /guests retorna 201 para cadastro válido', async () => {
    const response = await request(app).post('/guests').send(validGuest);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining({
      id: 1,
      name: 'John Smith',
      status: 'registered',
    }));
  });

  test('POST /guests retorna 400 para nome vazio', async () => {
    const response = await request(app).post('/guests').send({
      ...validGuest,
      name: '',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors.name).toBe('O nome é obrigatório.');
  });

  test('POST /guests retorna 400 para e-mail inválido', async () => {
    const response = await request(app).post('/guests').send({
      ...validGuest,
      email: 'johnexample.com',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors.email).toBe('Informe um e-mail válido.');
  });

  test('POST /guests retorna 400 para check-out anterior ao check-in', async () => {
    const response = await request(app).post('/guests').send({
      ...validGuest,
      checkOut: '2026-10-09',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors.checkOut).toBe(
      'A data de saída deve ser posterior à data de entrada.',
    );
  });

  test('resposta da API contém a estrutura de um hóspede cadastrado', async () => {
    const response = await request(app).post('/guests').send({
      ...validGuest,
      email: 'structure@example.com',
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      email: expect.any(String),
      phone: expect.any(String),
      checkIn: expect.any(String),
      checkOut: expect.any(String),
      guests: expect.any(Number),
      status: 'registered',
    }));
  });
});
