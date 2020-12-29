const express = require("express");
const config = require("config");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const validateRequest = require("./middlewares/validateRequest");
const setCORS = require("./middlewares/setCORS");

const app = express();
app.use(express.json());
app.use(validateRequest);
app.use(setCORS);
app.use(routes);
app.use(errorHandler);

app.listen(config.get("api.port"), () => console.log("Listening on port 3000"));
