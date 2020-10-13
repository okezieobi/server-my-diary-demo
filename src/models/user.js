import { Model, DataTypes, Op } from 'sequelize';

import bcryptUtil from '../utils/bcrypt';

export default class User extends Model {
  static async createOne(user, transaction) {
    await this.create(user, { transaction });
    return this.findOne({
      where: {
        [Op.and]: [
          { email: user.email }, { username: user.username },
        ],
      },
      transaction,
      attributes: {
        exclude: ['password', 'updatedAt'],
      },
    });
  }

  static async findByUnique({ email, username }, transaction, exclude = []) {
    return this.findOne({
      where: {
        [Op.or]: [
          { email }, { username },
        ],
      },
      transaction,
      attributes: {
        exclude,
      },
    });
  }

  static async findById(id, transaction) {
    return this.findByPk(id, { transaction });
  }

  static associate(models) {
    this.hasManyEntries = this.hasMany(models.entry, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
  }

  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        fullName: {
          type: DataTypes.STRING(256),
          allowNull: false,
          notEmpty: true,
        },
        username: {
          type: DataTypes.STRING(256),
          allowNull: false,
          unique: true,
          notEmpty: true,
        },
        email: {
          type: DataTypes.STRING(256),
          allowNull: false,
          unique: true,
          notEmpty: true,
          isEmail: true,
        },
        password: {
          type: DataTypes.TEXT,
          allowNull: false,
          notEmpty: true,
          set(value) {
            this.setDataValue('password', bcryptUtil.hashString(value));
          },
        },
        type: {
          type: DataTypes.TEXT,
          defaultValue: 'Client',
          isIn: [['Client', 'Admin']],
        },
      },
      {
        sequelize,
        modelName: 'User',
      },
    );
  }
}
