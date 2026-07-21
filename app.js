const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

const mockUsers = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com' },
  { id: 2, name: 'Alan Turing', email: 'alan@example.com' },
  { id: 3, name: 'Grace Hopper', email: 'grace@example.com' },
];

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/users', (req, res) => {
  res.json(mockUsers);
});

app.get('/api/users/:id', (req, res) => {
  const user = mockUsers.find((u) => u.id === Number(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }
  const newUser = { id: mockUsers.length + 1, name, email };
  mockUsers.push(newUser);
  res.status(201).json(newUser);
});

module.exports = app;
