import 'jest-chain';
import 'jest-extended';

import utils from './utils';

jest.setTimeout(10000);

beforeAll(async () => {
  await utils.models.sequelize.sync({ force: true, match: /test$/ });
  await utils.seed.userDAO.save();
  await utils.seed.entryDAO.save();
});

afterAll(async () => {
  await utils.models.sequelize.close();
});
