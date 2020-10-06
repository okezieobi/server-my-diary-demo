import models from '../models';

export default class UserServices {
  static async findWithUnique(user) {
    return models.UserModel.findByUnique(user, models);
  }

  static async create(user) {
    return models.UserModel.createOne(user, models);
  }
}
