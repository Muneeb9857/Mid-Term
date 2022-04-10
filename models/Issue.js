const mongoose = require("mongoose");

const issueSchema = mongoose.Schema({
  tid: Number,
  rent: Number,
});

module.exports = mongoose.model("Issues", issueSchema);
