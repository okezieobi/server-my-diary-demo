import Sequelize from 'sequelize';

import UserModel from './user';
import env from '../utils/env';

const sequelize = new Sequelize(env.databaseURL, { ssl: true, dialect: 'postgres' });
// pass your sequelize config here

const models = { UserModel };

Object.values(models).forEach((model) => model.init(sequelize));

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));

(async () => {
  await sequelize.authenticate();
  await sequelize.sync();
})();

export default {
  ...models,
  sequelize,
};
