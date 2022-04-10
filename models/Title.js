const mongoose = require("mongoose");

const titleSchema = mongoose.Schema({
  tid: Number,
  rent: Number,
  image: String,
  episode: String,
  title: String,
  type: String,
  date: String,
});

module.exports = mongoose.model("Titles", titleSchema);
