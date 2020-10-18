import { Sequelize } from 'sequelize';

async function up(queryInterface) {
  await queryInterface.sequelize.transaction(async (t) => {
    await queryInterface.createTable('Entries', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(256),
        allowNull: false,
        notEmpty: true,
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
        notEmpty: true,
      },
      UserId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id',
        },
        allowNull: false,
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
}

async function down(queryInterface) {
  await queryInterface.sequelize.transaction(async (t) => {
    await queryInterface.dropTable('Entries', { transaction: t });
  });
}

export default { up, down };
