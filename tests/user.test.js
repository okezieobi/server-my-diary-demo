import request from 'supertest';

import app from '../src/app';
import utils from './utils';

describe('User should be able to signup to the app', () => {
  it('User should be able to successfully signup with all required fields ', async () => {
    const { status, body: { data } } = await request(app).post('/api/v1/auth/signup').send(utils.user.mock);
    expect(status).toBeNumber().toEqual(201);
    expect(data).toBeObject().toContainKeys(['user', 'token']);
    expect(data.token).toBeString();
    expect(data.user.fullName).toBeString().toEqual(utils.user.mock.fullName);
    expect(data.user.username).toBeString().toEqual(utils.user.mock.username);
    expect(data.user.email).toBeString().toEqual(utils.user.mock.email);
    expect(data.user.type).toBeString().toEqual('Client');
    expect(data.user.createdAt).toBeString();
  });
});
