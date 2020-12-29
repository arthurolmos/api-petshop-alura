const InvalidField = require("../errors/InvalidField");
const NotFound = require("../errors/NotFound");
const DataNotProvided = require("../errors/DataNotProvided");
const repo = require("../repositories/SupplierProduct");

class SupplierProduct {
  constructor({
    id,
    title,
    price,
    stock,
    supplierId,
    createdAt,
    updatedAt,
    version,
  }) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.stock = stock;
    this.supplierId = supplierId;
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
    if (!result) throw new NotFound("Produto");

    return result;
  }

  async create() {
    this.validateCreate();

    const results = await repo.create({
      title: this.title,
      price: this.price,
      stock: this.stock,
      supplierId: this.supplierId,
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

  async load() {
    const result = await this.findById();

    this.price = result.price;
    this.title = result.title;
    this.stock = result.stock;
    this.createdAt = result.createdAt;
    this.updatedAt = result.updatedAt;
    this.version = result.version;
  }

  validateCreate() {
    if (typeof this.title !== "string" || this.title.length === 0) {
      throw new InvalidField("title");
    }

    if (typeof this.price !== "number" || this.price === 0) {
      throw new InvalidField("price");
    }
  }

  validateUpdate() {
    const upd = {};

    if (typeof this.title === "string" && this.title.length > 0) {
      upd.title = this.title;
    }

    if (typeof this.price === "number" && this.price.length >= 0) {
      upd.price = this.price;
    }

    if (typeof this.stock === "number" && this.stock.length >= 0) {
      upd.stock = this.stock;
    }

    return upd;
  }

  async diminishStock() {
    await repo.diminish(this.id, "stock", this.stock);
  }

  static async checkStockReplacement(supplierId) {
    const results = await repo.checkStockReplacement(supplierId);

    return results;
  }
}

module.exports = SupplierProduct;
