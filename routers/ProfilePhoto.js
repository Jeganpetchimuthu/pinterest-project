const express = require("express");
const multer = require("multer");
const ProfilePhoto = require("../models/ProfilePhoto");
const fs = require("fs");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/photo", upload.single("testImage"), (req, res) => {
  const saveImage = new ProfilePhoto({
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
    .catch((res) => {
      console.log(error, "error");
    });
});
router.get("/photo", async (req, res) => {
  try {
    const image = await ProfilePhoto.find();
    res.status(200).json(image);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/profileImage/:_id", async (req, res) => {
  const _id = req.params._id;
  try {
    await ProfilePhoto.findOneAndUpdate({
      _id: req.params._id,
    });
    res.status(201).json({ _id: _id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
