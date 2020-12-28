const { Router } = require("express");
const SupplierController = require("./controllers/Supplier");

const routes = Router();

routes.get("/suppliers", SupplierController.index);
routes.get("/suppliers/:id", SupplierController.findById);
routes.post("/suppliers", SupplierController.create);
routes.put("/suppliers/:id", SupplierController.update);
routes.delete("/suppliers/:id", SupplierController.delete);

module.exports = routes;
