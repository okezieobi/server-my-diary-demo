import Sequelize from 'sequelize';

import UserModel from './user';
import env from '../utils/env';

const { error } = console;

const sequelize = new Sequelize(env.databaseURL, { ssl: true, dialect: 'postgres', logging: false });
// pass your sequelize config here

const models = { UserModel };

Object.values(models).forEach((model) => model.init(sequelize));

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  } catch (err) {
    await error(err);
  }
})();

export default {
  models,
  sequelize,
};
