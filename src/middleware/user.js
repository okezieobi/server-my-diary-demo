import jwt from '../utils/jwt';

export default class UserMiddleWare {
  constructor(services) {
    this.services = services.user;
    this.findById = this.findById.bind(this);
  }

  async findById({ headers }, res, next) {
    try {
      const { id } = jwt.verify(headers);
      const user = await this.services.authJWT(id);
      if (user.message) next(user);
      else {
        res.locals.id = id;
        next();
      }
    } catch (err) {
      next(err);
    }
  }
}
