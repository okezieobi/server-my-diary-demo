import bcryptUtil from '../utils/bcrypt';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize.transaction(async (t) => {
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
      }, { transaction: t });
    });
  },

  down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable('Users', { transaction: t });
    });
  },
};
