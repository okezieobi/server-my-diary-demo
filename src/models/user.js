import { Model, DataTypes, Op } from 'sequelize';

import bcryptUtil from '../utils/bcrypt';

export default class User extends Model {
  static async createOne(user, sequelize) {
    return sequelize.transaction(async (t) => {
      await this.create(user, { transaction: t });
      return this.findOne({
        where: {
          [Op.and]: [
            { email: user.email }, { username: user.username },
          ],
        },
        transaction: t,
        attributes: {
          exclude: ['password'],
        },
      });
    });
  }

  static async findByUnique({ email, username }, sequelize) {
    return sequelize.transaction(async (t) => this.findOne({
      where: {
        [Op.or]: [
          { email }, { username },
        ],
      },
      transaction: t,
    }));
  }

  static async findById({ id }, sequelize) {
    return sequelize.transaction(async (t) => this.findByPk(id, { transaction: t }));
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
        },
        type: {
          type: DataTypes.TEXT,
          defaultValue: 'Client',
          isIn: [['Client', 'Admin']],
        },
      },
      {
        hooks: {
          beforeCreate: async (user) => {
            const placeholder = user;
            placeholder.password = await bcryptUtil.hashString(placeholder.password);
          },
        },
        sequelize,
        modelName: 'User',
        timestamps: true,
      },
    );
  }
}
