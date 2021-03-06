export default class EntryController {
  constructor({ entry }) {
    this.service = entry;
    this.createOne = this.createOne.bind(this);
    this.findAll = this.findAll.bind(this);
    this.updateOne = this.updateOne.bind(this);
    this.findOneById = this.findOneById.bind(this);
  }

  createOne({ body: { title, body } }, res, next) {
    this.service.create({ title, body, UserId: res.locals.userId })
      .then((data) => {
        res.locals.data = data;
        next();
      }).catch(next);
  }

  findAll(req, res, next) {
    this.service.findByOwner(res.locals.userId)
      .then((data) => {
        res.locals.data = data;
        next();
      }).catch(next);
  }

  findOneById({ params: { id } }, res, next) {
    this.service.findOneByOwner({ UserId: res.locals.userId, id })
      .then((data) => {
        res.locals.data = data;
        next();
      }).catch(next);
  }

  updateOne({ body: { title, body } }, res, next) {
    this.service.updateOne({
      title: title || res.locals.data.entity.title,
      body: body || res.locals.data.entity.body,
      UserId: res.locals.userId,
      id: res.locals.data.entry.id,
    }).then((data) => {
      res.locals.data = data;
      next();
    }).catch(next);
  }
}
