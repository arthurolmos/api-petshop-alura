const NotFound = require("../errors/NotFound");
const InvalidField = require("../errors/InvalidField");
const DataNotProvided = require("../errors/DataNotProvided");
const ValueNotSupported = require("../errors/ValueNotSupported");
const { ErrorSerializer } = require("../serializer/Serializer");

module.exports = (err, req, res, next) => {
  let status = 500;

  if (err instanceof NotFound) {
    status = 404;
  }

  if (err instanceof InvalidField) {
    status = 400;
  }

  if (err instanceof DataNotProvided) {
    status = 400;
  }

  if (err instanceof ValueNotSupported) {
    status = 406;
  }

  const serializer = new ErrorSerializer(res.getHeader("Content-Type"));
  console.log(err.message);
  res
    .status(status)
    .send(serializer.serialize({ message: err.message, id: err.id }));
};
