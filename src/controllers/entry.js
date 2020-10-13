export default class EntryController {
  constructor(services) {
    this.services = services;
  }

  async createOne({ body }, res, next) {
    try {
      const entry = await this.services.entry.createOne(body);
      if (entry.message) next(entry);
      else {
        res.locals.entry = entry;
        next();
      }
    } catch (err) {
      next(err);
    }
  }
}
