const Supplier = require("../models/Supplier");

module.exports = async (req, res, next) => {
  try {
    const { supplierId } = req.params;

    const supplier = new Supplier({ id: supplierId });

    await supplier.load();

    req.supplier = supplier;

    next();
  } catch (err) {
    next(err);
  }
};
