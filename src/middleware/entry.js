export default class EntryMiddleware {
  constructor(services) {
    this.services = services.entry;
    this.findOneById = this.findOneById.bind(this);
  }

  async findOneById({ params: { id } }, res, next) {
    try {
      const data = await this.services.findOneByOwner({ UserId: res.locals.id, id });
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
