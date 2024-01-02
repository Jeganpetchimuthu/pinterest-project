const mongoose = require("mongoose");

const createImageSchema = new mongoose.Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
});

const createImage = mongoose.model("createImage", createImageSchema);

module.exports = createImage;
