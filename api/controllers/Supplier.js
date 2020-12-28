const Supplier = require("../models/Supplier");
const { SupplierSerializer } = require("../serializer/Serializer");

module.exports = {
  index: async (req, res, next) => {
    try {
      const results = await Supplier.index();

      const serializer = new SupplierSerializer(res.getHeader("Content-Type"));
      res.status(200).send(serializer.serialize(results));
    } catch (err) {
      next(err);
    }
  },

  findById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const supplier = new Supplier({ id });

      await supplier.load();

      const serializer = new SupplierSerializer(res.getHeader("Content-Type"), [
        "email",
        "createdAt",
        "updatedAt",
        "version",
      ]);
      res.status(200).send(serializer.serialize(supplier));
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const data = req.body;

      const supplier = new Supplier(data);

      await supplier.create();

      const serializer = new SupplierSerializer(res.getHeader("Content-Type"));
      res.status(201).send(serializer.serialize(supplier));
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const values = req.body;

      const supplier = new Supplier({ id, ...values });
      await supplier.update();

      const serializer = new SupplierSerializer(res.getHeader("Content-Type"));
      res.status(200).send(serializer.serialize(supplier));
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const supplier = new Supplier({ id });

      await supplier.load();

      await supplier.delete();

      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
};
