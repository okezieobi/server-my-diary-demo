import 'jest-chain';
import 'jest-extended';

import umzug from '../utils/umzug';
import models from '../models';

beforeAll(async () => {
  await umzug.migrations.up(['00-user-migrate.js', '00-entry-migrate.js']);
});

beforeEach(async () => {
  await umzug.seeders.up(['00-user-seed.js', '00-entry-seed.js']);
});

afterEach(async () => {
  await umzug.seeders.down(['00-entry-seed.js', '00-user-seed.js']);
});

afterAll(async () => {
  await umzug.migrations.down(['00-entry-migrate.js', '00-user-migrate.js']);
  await models.sequelize.close();
});
