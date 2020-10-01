import services from '../services';
import jwt from '../utils/jwt';

export default class UserController {
  static async create({ body }, res, next) {
    try {
      const newUser = await services.UserServices.create(body);
      const token = await jwt.generate(newUser);
      res.status(201).send({ data: { token, newUser } });
    } catch (err) {
      next(err);
    }
  }
}
