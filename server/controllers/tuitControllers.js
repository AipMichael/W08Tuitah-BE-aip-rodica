const debug = require("debug")("tuits:controllers:tuitControllers");
const chalk = require("chalk");
const Tuit = require("../../database/models/tuit");

const getTuits = async (req, res) => {
  const tuits = await Tuit.find();
  res.json(tuits);
};

const createTuit = async (req, res, next) => {
  try {
    const tuit = req.body;
    const newTuit = await Tuit.create(tuit);
    res.status(201).json(newTuit);
  } catch (error) {
    debug(chalk.red(error));
    error.code = 400;
    next(error);
  }
};

const deleteTuit = async (req, res, next) => {
  const { id } = req.params;
  try {

    const tuitToDelete = await Tuit.findOneAndDelete({ id });
    if (tuitToDelete) {
      res.json({ id: tuitToDelete });

    } else {
      const error = new Error("Tuit not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {

    error.code = 400;
    error.message = "Bad Request!";

    next(error);
  }
};

module.exports = {
  getTuits,
  createTuit,
  deleteTuit,
};
