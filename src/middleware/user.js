import jwt from '../utils/jwt';

export default class UserMiddleWare {
  constructor(services) {
    this.services = services.user;
    this.findById = this.findById.bind(this);
  }

  async findById({ headers }, res, next) {
    await jwt.verify(headers)
      .then(async ({ id }) => {
        await this.services.authJWT(id).then((data) => {
          if (data.message) throw data;
          else {
            res.locals.userId = id;
            next();
          }
        });
      }).catch(next);
  }
}
