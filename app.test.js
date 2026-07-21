const request = require('supertest');
const app = require('./app');

describe('GET /health', () => {
  it('returns status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('GET /api/users', () => {
  it('returns a list of mock users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('GET /api/users/:id', () => {
  it('returns a single user when found', async () => {
    const res = await request(app).get('/api/users/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  it('returns 404 when user is not found', async () => {
    const res = await request(app).get('/api/users/999');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});

describe('POST /api/users', () => {
  it('creates a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Margaret Hamilton', email: 'margaret@example.com' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Margaret Hamilton');
  });

  it('returns 400 when required fields are missing', async () => {
    const res = await request(app).post('/api/users').send({ name: 'Incomplete' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
