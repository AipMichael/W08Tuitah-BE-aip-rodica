require("dotenv").config();
const debug = require("debug")("tuits:database");

const chalk = require("chalk");
const mongoose = require("mongoose");

const connectDB = () =>
  new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGODB_SERVER, (error) => {
      if (error) {
        debug(
          chalk.red("Tuitah-error. La base de datos no ha podido iniciarse.")
        );
        reject();
        return;
      }
      debug(chalk.green("Tuitah-tención. Conectado a la base de datos"));
      resolve();
    });
  });

module.exports = connectDB;
