import CustomError from './error';

export default class UserServices {
  constructor({
    User, Entry, sequelize, Sequelize,
  }) {
    this.model = User;
    this.entryModel = Entry;
    this.sequelize = sequelize;
    this.Sequelize = Sequelize;
  }

  async create(arg) {
    return this.sequelize.transaction(async (t) => {
      const userExists = await this.model.findOne({
        where: {
          [this.Sequelize.Op.or]: [
            { email: arg.email }, { username: arg.username },
          ],
        },
        transaction: t,
      });
      if (userExists) throw new CustomError(406, `Account already exists with either email ${arg.email} or username ${arg.username}, please sign in or sign up with a different email or username`);
      else {
        await this.model.create(arg, { transaction: t });
        const user = await this.model.findOne({
          where: {
            [this.Sequelize.Op.and]: [
              { email: arg.email }, { username: arg.username },
            ],
          },
          transaction: t,
          attributes: {
            exclude: ['password', 'updatedAt'],
          },
        });
        return { user, status: 201 };
      }
    });
  }

  async auth(arg) {
    return this.sequelize.transaction(async (t) => {
      const userExists = await this.model.findOne({
        where: {
          [this.Sequelize.Op.or]: [
            { email: arg.user }, { username: arg.user },
          ],
        },
        transaction: t,
      });
      if (userExists) {
        const verifyPassword = await this.model.compareString(userExists.password, arg.password);
        if (!verifyPassword) throw new CustomError(401, 'Password provided does not match user');
      } else throw new CustomError(404, `Account with ${userExists} does not exist, please sign up by creating an account`);
      const user = await this.model.findOne({
        where: {
          [this.Sequelize.Op.or]: [
            { email: arg.user }, { username: arg.user },
          ],
        },
        transaction: t,
        attributes: {
          exclude: ['password'],
        },
      });
      return { user };
    });
  }

  async authJWT({ id }) {
    return this.sequelize.transaction(async (t) => {
      const user = await this.model.findByPk(id, {
        transaction: t,
        attributes: {
          exclude: ['password'],
        },
      });
      if (!user) throw new CustomError(401, 'User not found, please sign up by creating an account');
      return user;
    });
  }

  async getUser(arg) {
    return this.sequelize.transaction(async (t) => this.model.findByPk(arg, {
      transaction: t,
      attributes: {
        exclude: ['password'],
      },
      include: { model: this.entryModel },
    }));
  }
}
