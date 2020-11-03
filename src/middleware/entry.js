export default class EntryMiddleware {
  constructor(services) {
    this.services = services.entry;
    this.findOneById = this.findOneById.bind(this);
  }

  async findOneById({ params: { id } }, res, next) {
    await this.services.findOneByOwner({ UserId: res.locals.userId, id })
      .then((data) => {
        if (data.message) throw data;
        else {
          res.locals.data = data;
          next();
        }
      }).catch(next);
  }
}
