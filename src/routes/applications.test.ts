import request from 'supertest';
import express from 'express';
import router from './applications';

const app = express();
app.use(express.json());
app.use('/api', router);

describe('POST /api/apply', () => {
  it('returns 3 offers for valid payload', async () => {
    const payload = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      employmentStatus: 'Self-Employed',
      loanPurpose: 'Home Improvement',
      amount: 7000,
      deposit: 0,
      term: 3
    };
    const res = await request(app).post('/api/apply').send(payload);
    expect(res.status).toBe(200);
    expect(res.body.offers).toHaveLength(3);
  });

  it('rejects invalid payload', async () => {
    const res = await request(app).post('/api/apply').send({});
    expect(res.status).toBe(400);
  });
});