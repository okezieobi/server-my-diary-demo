import Umzug from 'umzug';
import path from 'path';

import models from '../models';

const migrations = new Umzug({
  migrations: {
    // indicates the folder containing the migration .js files
    path: path.join(__dirname, '../migrations'),
    // inject sequelize's QueryInterface in the migrations
    params: [
      models.sequelize.getQueryInterface(),
    ],
  },
  // indicates that the migration data should be store in the database
  // itself through sequelize. The default configuration creates a table
  // named `SequelizeMeta`.
  storage: 'sequelize',
  storageOptions: {
    sequelize: models.sequelize,
  },
});

const seeders = new Umzug({
  migrations: {
    // indicates the folder containing the migration .js files
    path: path.join(__dirname, '../seeders'),
    // inject sequelize's QueryInterface in the migrations
    params: [
      models.sequelize.getQueryInterface(),
    ],
  },
  // indicates that the migration data should be store in the database
  // itself through sequelize. The default configuration creates a table
  // named `SequelizeMeta`.
  storage: 'sequelize',
  storageOptions: {
    sequelize: models.sequelize,
  },
});

export default {
  migrations, seeders,
};
