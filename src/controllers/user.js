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
      res.cookie('token', token, { expires: new Date(Date.now() + 24 * 3600000), httpOnly: true });
      next();
    };
    this.logout = (req, res, next) => {
      res.locals.data = {};
      res.cookie('token', null);
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

  findById(req, { locals: { userId } }, next) {
    this.service.authJWT(userId).then(() => next()).catch(next);
  }

  getUser({ cookies }, res, next) {
    const userId = jwt.verify(cookies);
    this.service.getUser(userId)
      .then((data) => {
        res.locals.data = data;
        next();
      }).catch(next);
  }
}
