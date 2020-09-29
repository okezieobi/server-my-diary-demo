import services from '../services';

export default class UserController {
  static async create({ body }, res, next) {
    try {
      const data = services.UserServices.create(body);
      res.status(201).send({ data });
    } catch (err) {
      next(err);
    }
  }
}
