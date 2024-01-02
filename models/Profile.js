const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  SureName: {
    type: String,
    required: true,
  },
  UserName: {
    type: String,
    required: true,
  },
});

user = mongoose.model("profile", profileSchema);

module.exports = user;
