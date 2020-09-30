import services from '../services';

export default class UserController {
  static async create({ body }, res, next) {
    try {
      const newUser = await services.UserServices.create(body);
      res.status(201).send({ data: { token: newUser.token, newUser } });
    } catch (err) {
      next(err);
    }
  }
}
