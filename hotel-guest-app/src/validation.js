const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+]?[(]?[0-9]{1,4}[)]?[-\s0-9]{7,}$/;

function validateReservation({ checkIn = '', checkOut = '' } = {}) {
  const errors = {};

  if (!checkIn) {
    errors.checkIn = 'A data de entrada é obrigatória.';
  }

  if (!checkOut) {
    errors.checkOut = 'A data de saída é obrigatória.';
  }

  if (checkIn && checkOut && checkOut <= checkIn) {
    errors.checkOut = 'A data de saída deve ser posterior à data de entrada.';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

function getGuestValidationErrors(data = {}) {
  const errors = {};
  const name = String(data.name ?? '').trim();
  const email = String(data.email ?? '').trim();
  const phone = String(data.phone ?? '').trim();
  const guests = Number(data.guests);

  if (!name) {
    errors.name = 'O nome é obrigatório.';
  } else if (name.length < 3) {
    errors.name = 'O nome deve conter pelo menos 3 caracteres.';
  }

  if (!email) {
    errors.email = 'O e-mail é obrigatório.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Informe um e-mail válido.';
  }

  if (!phone) {
    errors.phone = 'O telefone é obrigatório.';
  } else if (!PHONE_PATTERN.test(phone)) {
    errors.phone = 'Informe um número de telefone válido.';
  }

  const reservation = validateReservation(data);
  Object.assign(errors, reservation.errors);

  if (!Number.isInteger(guests) || guests <= 0) {
    errors.guests = 'O número de hóspedes deve ser maior que zero.';
  }

  return errors;
}

function validateGuest(data = {}) {
  return Object.keys(getGuestValidationErrors(data)).length === 0;
}

export { getGuestValidationErrors, validateGuest, validateReservation };
