const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
});

const image = mongoose.model("profile_Photo", imageSchema);

module.exports = image;
