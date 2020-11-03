export default class UserController {
  constructor(services) {
    this.services = services.user;
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  async signup({ body }, res, next) {
    await this.services.create(body)
      .then((data) => {
        if (data.message) throw data;
        else {
          res.locals.data = data;
          next();
        }
      }).catch(next);
  }

  async login({ body }, res, next) {
    await this.services.auth({ user: body.user, password: body.password })
      .then((data) => {
        if (data.message) throw data;
        else {
          res.locals.data = data;
          next();
        }
      }).catch(next);
  }
}
