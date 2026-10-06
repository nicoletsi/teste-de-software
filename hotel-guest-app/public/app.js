const form = document.querySelector('#guest-form');
const list = document.querySelector('#guest-list');
const count = document.querySelector('#guest-count');
const status = document.querySelector('#status-message');

function showErrors(errors) {
  document.querySelectorAll('.error').forEach((element) => {
    element.textContent = '';
  });
  document.querySelectorAll('.invalid').forEach((element) => {
    element.classList.remove('invalid');
  });

  Object.entries(errors).forEach(([field, message]) => {
    const error = document.querySelector(`#${field}-error`);
    const input = form.elements[field];
    if (error) error.textContent = message;
    if (input) input.classList.add('invalid');
  });
}

function renderGuests(guests) {
  count.textContent = guests.length;
  list.replaceChildren();

  if (!guests.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = 'Nenhum hóspede cadastrado ainda.';
    list.append(empty);
    return;
  }

  guests.forEach((guest) => {
    const item = document.createElement('article');
    item.className = 'guest-item';
    item.innerHTML = `
      <strong>${guest.name}</strong>
      <span>${guest.email} · ${guest.checkIn} a ${guest.checkOut} · ${guest.guests} hóspede(s)</span>
    `;
    list.append(item);
  });
}

async function loadGuests() {
  const response = await fetch('/guests');
  if (response.ok) renderGuests(await response.json());
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  status.textContent = '';
  showErrors({});

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  payload.guests = Number(payload.guests);

  const response = await fetch('/guests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  if (!response.ok) {
    showErrors(result.errors ?? {});
    status.textContent = result.error ?? 'Não foi possível cadastrar o hóspede.';
    return;
  }

  form.reset();
  status.textContent = 'Hóspede registrado com sucesso!';
  await loadGuests();
});

loadGuests();
