const Sequelize = require("sequelize");
const instance = require("..");

const columns = {
  company: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.ENUM("ração", "brinquedos"),
    allowNull: false,
  },
};

const options = {
  freezeTableName: true,
  tableName: "suppliers",
  timestamp: true,
};

module.exports = instance.define("suppliers", columns, options);
