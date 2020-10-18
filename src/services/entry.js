export default class EntryServices {
  constructor(models) {
    this.models = models;
  }

  async create(arg) {
    return this.models.sequelize.transaction(async (t) => {
      const entry = await this.models.entry.createOne(arg, t);
      return { entry, status: 201 };
    });
  }

  async findByOwner(arg) {
    return this.models.sequelize.transaction(async (t) => {
      const entries = await this.models.entry.findAllByOwnerId(arg, t);
      return { entries, status: 200 };
    });
  }
}
