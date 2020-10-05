import 'jest-chain';
import 'jest-extended';

import umzug from '../src/utils/umzug';
import models from '../src/models';

beforeEach(async () => {
  await umzug.migrations.down();
  await umzug.migrations.up();
});

afterAll(async () => {
  await models.sequelize.close();
});
