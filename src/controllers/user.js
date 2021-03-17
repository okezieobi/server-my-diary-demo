import jwt from '../utils/jwt';

export default class UserController {
  constructor({ user }, handleServices) {
    this.service = user;
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.authJWT = this.authJWT.bind(this);
    this.getUser = this.getUser.bind(this);
    this.setJWT = this.setJWT.bind(this);
    this.logout = this.logout.bind(this);
    this.handleServices = handleServices;
  }

  signup({ body }, res, next) {
    return this.handleServices(this.service, 'create', body, res, next);
  }

  login({ body }, res, next) {
    return this.handleServices(this.service, 'auth', body, res, next);
  }

  async logout(req, res, next) {
    await this.service.deleteJWT(res.locals.token.jti).catch(next);
    res.locals.data = {};
    next();
  }

  async authJWT({ headers: authorization }, res, next) {
    const keys = await this.service.getSigningKeys().catch(next);
    const { body: { sub, jti } } = jwt.verify(authorization, keys).catch(next);
    const user = await this.service.authJWT(sub, jti).catch(next);
    res.locals.user = user;
    next();
  }

  async setJWT(req, res, next) {
    const iss = `${req.protocol}://${req.get('host')}`;
    const sub = res.locals.data.user.id;
    const {
      token, signingKey, keyId, tokenId,
    } = jwt.generate(iss, sub);
    await this.service.saveJWT(tokenId, signingKey, keyId).catch(next);
    res.locals.data.token = token;
    next();
  }

  getUser(req, res, next) {
    return this.handleServices(this.service, 'getUser', res.locals.user.id, res, next);
  }
}
