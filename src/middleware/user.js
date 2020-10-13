import jwt from '../utils/jwt';

export default class UserMiddleWare {
  constructor(services) {
    this.services = services;
  }

  verifyToken({ headers }, res, next) {
    try {
      this.verifiedToken = jwt.verify(headers);
      res.set('userId', this.verifiedToken.userId);
    } catch (err) {
      next(err);
    }
  }

  async findById({ headers: { userId } }, res, next) {
    try {
      const user = await this.services.user.findById(userId);
      if (user.message) next(user);
      else next();
    } catch (err) {
      next(err);
    }
  }
}
