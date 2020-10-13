export default class EntryController {
  constructor(services) {
    this.services = services.entry;
  }

  async createOne({ body }, res, next) {
    try {
      const data = await this.services.createOne(body);
      if (data.message) next(data);
      else {
        res.locals.entry = data;
        next();
      }
    } catch (err) {
      next(err);
    }
  }
}
