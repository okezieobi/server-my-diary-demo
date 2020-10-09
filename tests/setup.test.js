import 'jest-chain';
import 'jest-extended';

import umzug from '../src/utils/umzug';
import models from '../src/models';

beforeAll(async () => {
  await umzug.migrations.down();
  await umzug.migrations.up();
});

beforeEach(async () => {
  await umzug.seeders.up();
});

afterEach(async () => {
  await umzug.seeders.down();
});

afterAll(async () => {
  await models.sequelize.close();
});
