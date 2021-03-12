export default class EntryController {
  constructor({ entry }) {
    this.service = entry;
    this.createOne = this.createOne.bind(this);
    this.findAll = this.findAll.bind(this);
    this.updateOne = this.updateOne.bind(this);
    this.findOneById = this.findOneById.bind(this);
  }

  createOne({ body: { title, body } }, res, next) {
    this.service.create({ title, body, UserId: res.locals.user.id })
      .then((data) => {
        res.locals.data = data;
        next();
      }).catch(next);
  }

  findAll(req, res, next) {
    this.service.findByOwner(res.locals.user.id)
      .then((data) => {
        res.locals.data = data;
        next();
      }).catch(next);
  }

  findOneById({ params: { id } }, res, next) {
    this.service.findOneByOwner({ UserId: res.locals.user.id, id })
      .then((data) => {
        res.locals.data = data;
        next();
      }).catch(next);
  }

  updateOne({ body: { title, body } }, res, next) {
    this.service.updateOne({
      title: title || res.locals.data.entry.title,
      body: body || res.locals.data.entry.body,
      UserId: res.locals.user.id,
      id: res.locals.data.entry.id,
    }).then((data) => {
      res.locals.data = data;
      next();
    }).catch(next);
  }
}
