import models from '../models';
import bcrypt from '../utils/bcrypt';

export default class UserServices {
  static async create(arg) {
    return models.sequelize.transaction(async (t) => {
      let data;
      const userExists = await models.user.findByUnique(arg, t);
      if (userExists) data = { message: 'User already exists with either email or username, please sign in', status: 406 };
      else {
        const user = await models.user.createOne(arg, t);
        data = { user, status: 201 };
      }
      return data;
    });
  }

  static async auth(arg) {
    return models.sequelize.transaction(async (t) => {
      let data;
      const user = await models.user.findByUnique({ email: arg.user, username: arg.user }, t);
      if (user) {
        const verifyPassword = await bcrypt.compareString(user.password, arg.password);
        if (verifyPassword) data = { user, status: 200 };
        else data = { message: 'Password provided does not match user', status: 400 };
      } else data = { message: 'User not found, please sign up by creating an account', status: 404 };
      return data;
    });
  }
}
