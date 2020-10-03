import request from 'supertest';

import app from '../src/app';
import utils from './utils';

describe('User should be able to signup to the app', () => {
  it('User should be able to successfully signup with all required fields ', async () => {
    const { status } = await request(app).post('/api/v1/auth/signup').send(utils.user.mock);
    expect(status).toBeNumber().toEqual(201);
  });
});
