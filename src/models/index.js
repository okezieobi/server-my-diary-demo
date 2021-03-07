/* eslint-disable no-console */
import { Sequelize, DataTypes } from 'sequelize';

import UserModel from './user';
import EntryModel from './entry';
import env from '../utils/env';

const sequelize = new Sequelize(env.databaseURL || '', { ssl: true, dialect: 'postgres', logging: false });
// pass your sequelize config here

const models = { User: UserModel, Entry: EntryModel };

Object.values(models).forEach((model) => model.initialize(sequelize, DataTypes));

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

(async () => {
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'production') {
    await sequelize.authenticate();
    // no sequelize.sync(); use migrations after writing models for production
  } else {
    await sequelize.authenticate().then(async () => {
      await sequelize.sync({ force: true, match: /dev$/ });
      console.log('Database connection attempt and model update successful');
    });
  }
})();

const modelTimestamps = (SequelizeDataTypes) => ({
  createdAt: {
    type: SequelizeDataTypes.DATE,
    defaultValue: SequelizeDataTypes.NOW,
  },
  updatedAt: {
    type: SequelizeDataTypes.DATE,
    defaultValue: SequelizeDataTypes.NOW,
  },
});

export default {
  ...models,
  sequelize,
  modelTimestamps,
  Sequelize,
};
