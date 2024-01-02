const express = require("express");
const mongoose = require("mongoose");

const Profile = require("../models/Profile");

const router = express.Router();

router.post("/profile", async (req, res) => {
  console.log(req.body);
  const newProfile = new Profile({
    FirstName: req.body.FirstName,
    SureName: req.body.SureName,
    UserName: req.body.UserName,
  });

  await newProfile.save();

  res.status(200).json(newProfile);
  res.status(400).json("error");
});

router.get("/profile", async (req, res) => {
  try {
    const profile = await Profile.find();
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.patch("/profile/:_id", async (req, res) => {
  const _id = req.params._id;
  try {
    await Profile.findOneAndUpdate(
      {
        _id: req.params._id,
      },
      {
        FirstName: req.body.FirstName,
        SureName: req.body.SureName,
        UserName: req.body.UserName,
      }
    );
    res.status(201).json({ _id: _id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/profile/:_id", async (req, res) => {
  const _id = req.params._id;
  try {
    await Profile.findOneAndRemove({
      _id: _id,
    });
    res.status(201).json({ _id: _id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
