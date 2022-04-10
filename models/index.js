const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/movies", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
  Title: require("./Title"),
  Issue: require("./Issue"),
};
