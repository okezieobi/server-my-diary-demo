import { Model, DataTypes } from 'sequelize';

export default class Entry extends Model {
  static async createOne(entry, transaction) {
    return this.create(entry, { transaction });
  }

  static async findAllByOwnerId(id, transaction) {
    return this.findAll({
      where: {
        userId: id,
      },
      transaction,
    });
  }

  static associate(models) {
    this.belongsToUser = this.belongsTo(models.user, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
  }

  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(256),
        allowNull: false,
        notEmpty: true,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        notEmpty: true,
      },
    },
    {
      sequelize,
      modelName: 'Entry',
    });
  }
}
