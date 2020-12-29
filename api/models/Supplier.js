const repo = require("../repositories/Supplier");
const NotFound = require("../errors/NotFound");
const InvalidField = require("../errors/InvalidField");

class Supplier {
  constructor({ id, company, email, category, createdAt, updatedAt, version }) {
    this.id = id;
    this.company = company;
    this.email = email;
    this.category = category;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.version = version;
  }

  static async index() {
    try {
      const results = await repo.index();

      return results;
    } catch (err) {
      return err;
    }
  }

  async findById() {
    const result = await repo.findById(this.id);
    if (!result) throw new NotFound("Fornecedor");

    return result;
  }

  async load() {
    const result = await this.findById(this.id);

    this.company = result.company;
    this.category = result.category;
    this.email = result.email;
    this.createdAt = result.createdAt;
    this.updatedAt = result.updatedAt;
    this.version = result.version;
  }

  async create() {
    this.validateCreate();

    const results = await repo.create({
      company: this.company,
      email: this.email,
      category: this.category,
    });

    this.id = results.id;
    this.createdAt = results.createdAt;
    this.updatedAt = results.updatedAt;
    this.version = results.version;
  }

  async update() {
    await this.findById();

    const upd = this.validateUpdate();

    if (Object.keys(upd).length === 0) {
      throw new DataNotProvided();
    }
    await repo.update(this.id, upd);
  }

  async delete() {
    await repo.delete(this.id);
  }

  validateCreate() {
    const fields = ["company", "email", "category"];

    fields.forEach((field) => {
      const value = this[field];
      if (typeof value !== "string" || value.length === 0) {
        throw new InvalidField(field);
      }
    });
  }

  validateUpdate() {
    const upd = {};

    const fields = ["company", "email", "category"];

    fields.forEach((field) => {
      const value = this[field];
      if (typeof value === "string" && value.length > 0) {
        upd[field] = value;
      }
    });

    return upd;
  }
}

module.exports = Supplier;
