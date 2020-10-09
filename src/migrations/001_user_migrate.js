import { Sequelize } from 'sequelize';

import bcryptUtil from '../utils/bcrypt';

async function up(queryInterface) {
  await queryInterface.createTable('Users', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    fullName: {
      type: Sequelize.STRING(256),
      allowNull: false,
      notEmpty: true,
    },
    username: {
      type: Sequelize.STRING(256),
      allowNull: false,
      unique: true,
      notEmpty: true,
    },
    email: {
      type: Sequelize.STRING(256),
      allowNull: false,
      unique: true,
      notEmpty: true,
      isEmail: true,
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false,
      notEmpty: true,
      set(value) {
        this.setDataValue('password', bcryptUtil.hashString(value));
      },
    },
    type: {
      type: Sequelize.TEXT,
      defaultValue: 'Client',
      isIn: [['Client', 'Admin']],
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  });
}

async function down(queryInterface) {
  await queryInterface.dropTable('Users');
}

export default { up, down };
