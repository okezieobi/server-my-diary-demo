import services from '../services';
import jwt from '../utils/jwt';

export default class UserController {
  static async create({ body }, res, next) {
    try {
      const user = await services.UserServices.create(body);
      const token = await jwt.generate(user);
      res.status(201).send({ data: { token, user, status: 201 } });
    } catch (err) {
      next(err);
    }
  }
}
