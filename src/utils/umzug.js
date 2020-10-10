import { Umzug, SequelizeStorage } from 'umzug';
import path from 'path';

import models from '../models';

const migrations = new Umzug({
  migrations: {
    path: path.resolve(__dirname, '../migrations'),
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
    path: path.resolve(__dirname, '../seeders'),
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
