export default class EntryServices {
  constructor(models) {
    this.models = models;
  }

  async create(arg) {
    return this.models.sequelize.transactions(async (t) => {
      const data = await this.models.entry.createOne(arg, t);
      return { data, status: 201 };
    });
  }

  async findByOwner(arg) {
    return this.models.sequelize.transactions(async (t) => {
      const data = await this.models.entry.findByOwnerId(arg, t);
      return { data, status: 200 };
    });
  }
}
