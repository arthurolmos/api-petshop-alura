const Sequelize = require("sequelize");
const Supplier = require("./Suppliers");
const instance = require("..");

const columns = {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  supplierId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Supplier,
      key: "id",
    },
  },
};

const options = {
  freezeTableName: true,
  tableName: "supplierProducts",
  timestamp: true,
};

module.exports = instance.define("supplierProducts", columns, options);
