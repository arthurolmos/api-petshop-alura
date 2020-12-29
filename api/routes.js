const { Router } = require("express");
const SupplierProductController = require("./controllers/SupplierProduct");
const SupplierController = require("./controllers/Supplier");
const verifySupplier = require("./middlewares/verifySupplier");

const routes = Router();

routes.options("/suppliers", (req, res) => {
  res.set("Access-Control-Allow-Methods", "GET, POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.status(204);
  res.end();
});
routes.get("/suppliers", SupplierController.index);
routes.post("/suppliers", SupplierController.create);

routes.options("/suppliers/:id", (req, res) => {
  res.set("Access-Control-Allow-Methods", "GET, PUT, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.status(204);
  res.end();
});
routes.get("/suppliers/:id", SupplierController.findById);
routes.put("/suppliers/:id", SupplierController.update);
routes.delete("/suppliers/:id", SupplierController.delete);

routes.options("/suppliers/:supplierId/products", (req, res) => {
  res.set("Access-Control-Allow-Methods", "GET, POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.status(204);
  res.end();
});
routes.get(
  "/suppliers/:supplierId/products",
  verifySupplier,
  SupplierProductController.index
);
routes.post(
  "/suppliers/:supplierId/products",
  verifySupplier,
  SupplierProductController.create
);

routes.options("/suppliers/:supplierId/products/:id", (req, res) => {
  res.set("Access-Control-Allow-Methods", "GET, HEAD, PUT, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.status(204);
  res.end();
});
routes.get(
  "/suppliers/:supplierId/products/:id",
  verifySupplier,
  SupplierProductController.findById
);
routes.head(
  "/suppliers/:supplierId/products/:id",
  verifySupplier,
  SupplierProductController.head
);
routes.put(
  "/suppliers/:supplierId/products/:id",
  verifySupplier,
  SupplierProductController.update
);
routes.delete(
  "/suppliers/:supplierId/products/:id",
  verifySupplier,
  SupplierProductController.delete
);

routes.options("/suppliers/:supplierId/check-stock-replacement", (req, res) => {
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.status(204);
  res.end();
});
routes.get(
  "/suppliers/:supplierId/check-stock-replacement",
  verifySupplier,
  SupplierProductController.checkStockReplacement
);

routes.options(
  "/suppliers/:supplierId/products/:id/diminish-stock",
  (req, res) => {
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.status(204);
    res.end();
  }
);
routes.post(
  "/suppliers/:supplierId/products/:id/diminish-stock",
  verifySupplier,
  SupplierProductController.diminishStock
);

module.exports = routes;
