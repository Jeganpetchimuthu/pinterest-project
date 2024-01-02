const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

const image = mongoose.model("card-img7", imageSchema);

module.exports = image;
