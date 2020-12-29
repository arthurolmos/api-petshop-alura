const SupplierProduct = require("../db/tables/SupplierProducts");
const instance = require("../db");

module.exports = {
  index(supplierId) {
    return SupplierProduct.findAll({ where: { supplierId }, raw: true });
  },

  findById(id) {
    return SupplierProduct.findByPk(id);
  },

  create(supplier) {
    return SupplierProduct.create(supplier);
  },

  update(id, values) {
    return SupplierProduct.update(values, { where: { id } });
  },

  delete(id) {
    return SupplierProduct.destroy({ where: { id } });
  },

  diminish(id, field, value) {
    return instance.transaction(async (t) => {
      const supplierProduct = await SupplierProduct.findByPk(id);

      supplierProduct[field] = value;

      await supplierProduct.save();

      return supplierProduct;
    });
  },

  checkStockReplacement(supplierId) {
    return SupplierProduct.findAll({
      where: { supplierId, stock: 0 },
      raw: true,
    });
  },
};
