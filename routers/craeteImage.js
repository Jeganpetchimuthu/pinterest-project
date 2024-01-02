const express = require("express");
const multer = require("multer");
const Images = require("../models/createImage");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// router.post("/creatImage", upload.single("file"), (req, res) => {
//   Images.create({ image: req.file.filename })
//     .then((result) => res.json(result))
//     .catch((error) => console.log(error));
// });

router.post("/createImage", upload.single("file"), (req, res) => {
  Images.create({ image: req.file.filename });
  const saveImage = new Images({
    image: {
      data: fs.readFileSync("upload/" + req.file.filename),
      contentType: "image/png",
    },
  });
  saveImage
    .save()
    .then((res) => {
      console.log("image save");
    })
    .catch((error) => {
      console.log(error);
    });
  res.send("image is saved");
});

router.get("/createImage", async (req, res) => {
  const allData = await Images.find();
  res.status(200).json(allData);
});

router.delete("/deleteImage/:_id", async (req, res) => {
  const _id = req.params._id;
  try {
    await Images.findOneAndRemove({
      _id: _id,
    });
    res.status(201).json({ _id: _id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
