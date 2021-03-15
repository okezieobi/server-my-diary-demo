import jwt from '../utils/jwt';

export default class UserController {
  constructor({ user }, handleServices) {
    this.service = user;
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.findById = this.findById.bind(this);
    this.getUser = this.getUser.bind(this);
    this.handleServices = handleServices;
    this.setJWT = (req, res, next) => {
      const token = jwt.generate(res.locals.data.user);
      res.cookie('token', token);
      next();
    };
    this.logout = (req, res, next) => {
      res.locals.data = {};
      res.clearCookie('token');
      next();
    };
  }

  signup({ body }, res, next) {
    return this.handleServices(this.service, 'create', body, res, next);
  }

  login({ body }, res, next) {
    return this.handleServices(this.service, 'auth', body, res, next);
  }

  async findById({ cookies }, res, next) {
    const decoded = jwt.verify(cookies);
    const user = await this.service.authJWT(decoded).catch(next);
    res.locals.user = user;
    next();
  }

  getUser(req, res, next) {
    return this.handleServices(this.service, 'getUser', res.locals.user.id, res, next);
  }
}
