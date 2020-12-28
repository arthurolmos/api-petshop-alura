const Suppliers = require("../tables/Supplier");

Suppliers.sync()
  .then(() => console.log("Suppliers table created succesfully!"))
  .catch((err) => console.log(err));
