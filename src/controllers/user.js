import jwt from '../utils/jwt';

export default class UserController {
  constructor({ user }) {
    this.service = user;
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.findById = this.findById.bind(this);
    this.getUser = this.getUser.bind(this);
    this.setJWT = (req, res, next) => {
      const token = jwt.generate(res.locals.data.user);
      res.cookie('token', token, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production',
      });
      next();
    };
    this.logout = (req, res, next) => {
      res.locals.data = {};
      res.clearCookie('token');
      next();
    };
  }

  signup({ body }, res, next) {
    this.service.create(body)
      .then((data) => {
        res.locals.data = data;
        next();
      }).catch(next);
  }

  login({ body }, res, next) {
    this.service.auth(body)
      .then((data) => {
        res.locals.data = data;
        next();
      }).catch(next);
  }

  findById({ cookies }, res, next) {
    const decoded = jwt.verify(cookies);
    this.service.authJWT(decoded).then((user) => {
      res.locals.user = user;
      next();
    }).catch(next);
  }

  getUser(req, res, next) {
    this.service.getUser(res.locals.user.id)
      .then((data) => {
        res.locals.data = data;
        next();
      }).catch(next);
  }
}
