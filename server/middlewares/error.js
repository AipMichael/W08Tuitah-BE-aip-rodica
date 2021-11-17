const debug = require("debug")("robots:errors");
const { ValidationError } = require("express-validation");

const notFoundErrorHandler = (req, res) => {
  res.status(404).json({
    error: "Tuit-tuit. Endpoint se ha perdido. Endpoint no encontrado.",
  });
};

const generalErrorHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    error.code = 401;
    error.message = "Tuit-tuit. Mala tuya.";
  }
  debug(`Tuit-tuit. Ha habido un error: ${error.message}`);
  const message = error.code
    ? error.message
    : "Error. Peligro. Ha habido un pete general.";
  res.status(error.code || 500).json({ error: message });
};

module.exports = {
  notFoundErrorHandler,
  generalErrorHandler,
};
