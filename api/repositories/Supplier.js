const Supplier = require("../db/tables/Supplier");

module.exports = {
  index() {
    return Supplier.findAll({ raw: true });
  },

  findById(id) {
    return Supplier.findByPk(id);
  },

  create(supplier) {
    return Supplier.create(supplier);
  },

  update(id, values) {
    return Supplier.update(values, { where: { id } });
  },

  delete(id) {
    return Supplier.destroy({ where: { id } });
  },
};
