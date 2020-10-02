const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.createTable('users', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
      },
      fullName: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
        notEmpty: true,
      },
      username: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
        unique: true,
        notEmpty: true,
      },
      email: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
        unique: true,
        notEmpty: true,
        isEmail: true,
      },
      password: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
        notEmpty: true,
        set(value) {
          this.setDataValue('password', bcrypt.hashSync(value, bcrypt.genSaltSync()));
        },
      },
      type: {
        type: Sequelize.DataTypes.TEXT,
        defaultValue: 'Client',
        isIn: [['Client', 'Admin']],
      },
    }, { transaction: t }),
  ])), /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

  down: async (queryInterface) => {
    queryInterface.sequelize.transaction((t) => Promise.all([
      queryInterface.dropTable('users', { transaction: t }),
    ]));
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
