import { Umzug, SequelizeStorage } from 'umzug';

import models from '../models';

const migrations = new Umzug({
  migrations: {
    path: './src/migrations',
    params: [
      models.sequelize.getQueryInterface(),
    ],
  },

  storage: new SequelizeStorage({
    sequelize: models.sequelize,
  }),
});

const seeders = new Umzug({
  migrations: {
    path: './src/seeders',
    params: [
      models.sequelize.getQueryInterface(),
    ],
  },

  storage: new SequelizeStorage({
    sequelize: models.sequelize,
  }),
});

export default {
  migrations, seeders,
};
