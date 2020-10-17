import request from 'supertest';

import app from '../app';
import utils from './utils';

describe('Authenticated User should be able to create, read, update and update an entry', () => {
  it('Should be able to create a diary entry as authenticated User if input fields are valie', async () => {
    const { status, body: { data } } = await request(app).post('/api/v1/entries')
      .set('token', utils.user.mock2.token).send(utils.entry.mock);
    expect(status).toBeNumber().toEqual(201);
    expect(data).toBeObject().toContainKeys(['entry', 'status']);
    expect(data.status).toBeNumber().toEqual(201);
    expect(data.entry.title).toBeString().toEqual(utils.entry.mock.title);
    expect(data.entry.body).toBeString().toEqual(utils.entry.mock.body);
    expect(data.entry.id).toBeString();
  });
});
