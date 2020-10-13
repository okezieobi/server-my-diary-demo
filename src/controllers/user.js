export default class UserController {
  constructor(services) {
    this.services = services.user;
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  async signup({ body }, res, next) {
    try {
      const data = await this.services.create(body);
      if (data.message) next(data);
      else {
        res.locals.data = data;
        next();
      }
    } catch (err) {
      next(err);
    }
  }

  async login({ body }, res, next) {
    try {
      const data = await this.services.auth({ user: body.user, password: body.password });
      if (data.message) next(data);
      else {
        res.locals.data = data;
        next();
      }
    } catch (err) {
      next(err);
    }
  }
}
