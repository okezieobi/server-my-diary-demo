import { Model, DataTypes, Op } from 'sequelize';

import jwtUtil from '../utils/jwt';
import bcryptUtil from '../utils/bcrypt';

export default class User extends Model {
  static async createOne(data, sequelize) {
    return sequelize.transaction(async (t) => this.create(data, { transaction: t }));
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
          afterCreate: (user) => {
            const placeholder = user;
            placeholder.token = jwtUtil.generate(user);
            placeholder.status = 201;
          },
          beforeCreate: async (user) => {
            const placeholder = user;
            placeholder.password = await bcryptUtil.hashString(user.password);
          },
        },
        sequelize,
        modelName: 'User',
        timestamps: true,
      },
    );
  }
}
