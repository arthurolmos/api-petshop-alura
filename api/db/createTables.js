const fs = require("fs");
const path = require("path");

const tablesPath = path.resolve(__dirname, "tables");
const tables = [];
fs.readdirSync(tablesPath).forEach((file) => {
  console.log(path.resolve(tablesPath, file));

  tables.push(require(path.resolve(tablesPath, file)));
});

console.log("TABLES", tables);

async function createTables() {
  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];

    await table
      .sync()
      .then(() => console.log(`${table} table created succesfully!`))
      .catch((err) => console.log(err));
  }
}

createTables();
