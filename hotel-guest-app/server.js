import express from 'express';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { GuestService } from './src/guestService.js';

const app = express();
const guestService = new GuestService();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/guests', (_request, response) => {
  response.json(guestService.list());
});

app.post('/guests', (request, response) => {
  try {
    const guest = guestService.create(request.body);
    response.status(201).json(guest);
  } catch (error) {
    response.status(400).json({
      error: error.message,
      errors: error.errors ?? {},
    });
  }
});

app.get('*', (_request, response) => {
  response.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(port, () => {
    console.log(`Hotel Guest App disponível em http://localhost:${port}`);
  });
}

export { app };
