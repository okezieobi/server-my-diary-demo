import { Model } from 'sequelize';

export default class Entry extends Model {
  static tableColumns(DataTypes) {
    return {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
        notEmpty: true,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        notEmpty: true,
      },
    };
  }

  static initialize(sequelize, DataTypes) {
    return this.init({
      ...this.tableColumns(DataTypes),
    },
    {
      sequelize,
      modelName: 'Entry',
    });
  }
}
