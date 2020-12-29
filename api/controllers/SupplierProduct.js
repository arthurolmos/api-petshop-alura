const repo = require("../repositories/SupplierProduct");
const { SupplierProductSerializer } = require("../serializer/Serializer");
const SupplierProduct = require("../models/SupplierProduct");

module.exports = {
  index: async (req, res, next) => {
    try {
      const supplier = req.supplier;

      const results = await repo.index(supplier.id);
      console.log(results);

      const serializer = new SupplierProductSerializer(
        res.getHeader("Content-Type")
      );
      res.status(200).send(serializer.serialize(results));
    } catch (err) {
      next(err);
    }
  },

  head: async (req, res, next) => {
    try {
      const { id } = req.params;
      const supplier = req.supplier;

      const supplierProduct = new SupplierProduct({
        id,
        supplierId: supplier.id,
      });
      await supplierProduct.load();

      res.set("ETag", supplierProduct.version);
      const timestamp = new Date(supplierProduct.updatedAt).getTime();
      res.set("Last-Modified", timestamp);
      res.set(
        "Location",
        `/suppliers/${supplier.id}/products/${supplierProduct.id}`
      );

      res.status(200);
      res.end();
    } catch (err) {
      next(err);
    }
  },

  findById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const supplier = req.supplier;

      const supplierProduct = new SupplierProduct({
        id,
        supplierId: supplier.id,
      });
      await supplierProduct.load();

      const serializer = new SupplierProductSerializer(
        res.getHeader("Content-Type"),
        ["price", "stock"]
      );
      res.status(200).send(serializer.serialize(supplierProduct));
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const supplier = req.supplier;
      const product = req.body;

      const supplierProduct = new SupplierProduct({
        ...product,
        supplierId: supplier.id,
      });

      await supplierProduct.create();

      const serializer = new SupplierProductSerializer(
        res.getHeader("Content-Type")
      );
      res.set("ETag", supplierProduct.version);
      const timestamp = new Date(supplierProduct.updatedAt).getTime();
      res.set("Last-Modified", timestamp);
      res.set(
        "Location",
        `/suppliers/${supplier.id}/products/${supplierProduct.id}`
      );

      res.status(201).send(serializer.serialize(supplierProduct));
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      console.log(req.body);
      const supplier = req.supplier;
      const { id } = req.params;
      const values = req.body;

      const supplierProduct = new SupplierProduct({
        id,
        supplierId: supplier.id,
        ...values,
      });

      await supplierProduct.update();
      await supplierProduct.load();

      const serializer = new SupplierProductSerializer(
        res.getHeader("Content-Type")
      );
      res.set("ETag", supplierProduct.version);
      const timestamp = new Date(supplierProduct.updatedAt).getTime();
      res.set("Last-Modified", timestamp);

      res.status(200).send(serializer.serialize(supplierProduct));
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { supplierId, id } = req.params;

      const supplierProduct = new SupplierProduct({ id, supplierId });

      await supplierProduct.findById();

      await supplierProduct.delete();

      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },

  diminishStock: async (req, res, next) => {
    try {
      const supplier = req.supplier;
      const { id } = req.params;
      const { stock } = req.body;

      const supplierProduct = new SupplierProduct({
        id,
        supplierId: supplier.id,
      });

      await supplierProduct.load();

      supplierProduct.stock = stock;

      await supplierProduct.diminishStock();
      await supplierProduct.load();

      const serializer = new SupplierProductSerializer(
        res.getHeader("Content-Type"),
        ["price", "stock"]
      );
      res.set("ETag", supplierProduct.version);
      const timestamp = new Date(supplierProduct.updatedAt).getTime();
      res.set("Last-Modified", timestamp);

      res.status(200).send(serializer.serialize(supplierProduct));
    } catch (err) {
      next(err);
    }
  },

  checkStockReplacement: async (req, res, next) => {
    try {
      const supplier = req.supplier;

      const results = await SupplierProduct.checkStockReplacement(supplier.id);
      console.log("results", results);

      const serializer = new SupplierProductSerializer(
        res.getHeader("Content-Type"),
        ["price", "stock"]
      );
      res.status(200).send(serializer.serialize(results));
    } catch (err) {
      next(err);
    }
  },
};
