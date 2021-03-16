import UserServices from './user';
import EntryServices from './entry';

import db from '../models';

const {
  User, Entry, Sequelize, sequelize, JWT,
} = db;

const user = new UserServices({
  User, Entry, Sequelize, sequelize, JWT,
});
const entry = new EntryServices({ Entry, Sequelize, sequelize });

export default {
  user, entry,
};
