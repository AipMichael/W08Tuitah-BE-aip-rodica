const { Schema, model } = require("mongoose");

const tuitSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  likes: {
    type: number,
    required: true,
  },
  date: {
    type: date,
    required: true,
  },
});

const Tuit = model("tuit", userSchema, "tuits");

module.exports = Tuit;
