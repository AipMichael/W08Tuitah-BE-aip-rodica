const chalk = require("chalk");
const debug = require("debug")("tuits:server");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { notFoundErrorHandler, generalErrorHandler } = require("./error");

const app = express();

let server;
const initializeServer = (port) =>
  new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      debug(
        chalk.blue(`Tuitah-tención. Se está escuchando en el puerto ${port}`)
      );
      resolve(server);
    });

    server.on("error", (error) => {
      debug(chalk.red("Tuit-tuit. Ha habido un error al iniciar el servidor."));
      if (error.code === "EADDRINUSE") {
        debug(chalk.blue(`Tuit-tuit. El puerto ${port} está en uso.`));
      }
      reject(error);
    });
  });

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/tuits", tuitRoutes);

app.use(notFoundErrorHandler);
app.use(generalErrorHandler);

module.exports = { initializeServer, app };
