export default class EntryController {
  constructor(services) {
    this.services = services.entry;
    this.createOne = this.createOne.bind(this);
    this.findAll = this.findAll.bind(this);
    this.updateOne = this.updateOne.bind(this);
  }

  async createOne({ body: { title, body } }, res, next) {
    try {
      const data = await this.services.create({ title, body, id: res.locals.userId });
      if (data.message) next(data);
      else {
        res.locals.data = data;
        next();
      }
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const data = await this.services.findByOwner(res.locals.userId);
      res.locals.data = data;
      next();
    } catch (err) {
      next(err);
    }
  }

  async updateOne({ body: { title, body } }, res, next) {
    try {
      const data = await this.services.updateOne({
        title: title || res.locals.data.entry.title,
        body: body || res.locals.data.entry.body,
        UserId: res.locals.userId,
        id: res.locals.data.entry.id,
      });
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
