export default class UserMiddleWare {
  constructor(services) {
    this.services = services.user;
    this.findById = this.findById.bind(this);
  }

  async findById({ headers: { userId } }, res, next) {
    try {
      const user = await this.services.findById(userId);
      if (user.message) next(user);
      else next();
    } catch (err) {
      next(err);
    }
  }
}
