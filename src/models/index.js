import { Sequelize } from 'sequelize';

import UserModel from './user';
import env from '../utils/env';

const sequelize = new Sequelize(env.databaseURL, { ssl: true, dialect: 'postgres' });
// pass your sequelize config here

const models = { user: UserModel };

Object.values(models).forEach((model) => model.init(sequelize));

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));

(async () => {
  await sequelize.authenticate();
  if (process.env.NODE_ENV !== 'test') {
    await sequelize.sync({ force: true });
  }
  // no sequelize.sync(); use umzug migrations after writing models
})();

export default {
  ...models,
  sequelize,
};
