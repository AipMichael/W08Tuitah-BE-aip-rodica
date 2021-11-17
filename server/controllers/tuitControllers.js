const debug = require("debug")("tuits:controllers:tuitControllers");
const chalk = require("chalk");

const getTuits = async (req, res) => {
  const tuits = await Tuit.find();
  res.json(tuits);
};

module.exports={
  getTuits,
};