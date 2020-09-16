import request from 'supertest';

import app from '../src/app';

describe('Test app for setup', () => {
  it('Testing ', async () => {
    const { body: { data } } = await request(app).get('/');
    expect(data).toMatch(/respond with a resource/);
  });
});
