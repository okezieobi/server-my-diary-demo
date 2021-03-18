import jwt from '../utils/jwt';

export default class UserController {
  constructor({ user }, handleServices) {
    this.service = user;
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.authJWT = this.authJWT.bind(this);
    this.getUser = this.getUser.bind(this);
    this.logout = (req, res, next) => {
      res.locals.data = {};
      res.clearCookie('authorization');
      next();
    };
    this.setJWT = async (req, res, next) => {
      const token = await jwt.generate(res.locals.data.user).catch(next);
      res.cookie('authorization', token, {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      });
      next();
    };
    this.handleServices = handleServices;
  }

  signup({ body }, res, next) {
    return this.handleServices(this.service, 'create', body, res, next);
  }

  login({ body }, res, next) {
    return this.handleServices(this.service, 'auth', body, res, next);
  }

  async authJWT({ cookies }, res, next) {
    const decoded = await jwt.verify(cookies).catch((err) => {
      if (process.env.NODE_ENV === 'production') next({ status: 401, message: err.message });
      else next(err);
    });
    res.locals.user = await this.service.authJWT(decoded).catch(next);
    next();
  }

  getUser(req, res, next) {
    return this.handleServices(this.service, 'getUser', res.locals.user.id, res, next);
  }
}
