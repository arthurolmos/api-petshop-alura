const acceptedFormats = require("../serializer/Serializer").acceptedFormats;

module.exports = (req, res, next) => {
  let format = req.header("Accept");

  if (format === "*/*") {
    format = "application/json";
  }

  if (acceptedFormats.indexOf(format) === -1) {
    res.status(406).end();
    return;
  }

  res.setHeader("Content-Type", format);

  next();
};
