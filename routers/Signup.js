const express = require("express");

const Signup = require("../models/Signup");

const mongoose = require("mongoose");

const router = express.Router();

const bcrypt = require("bcrypt");

const generateToken = require("../VerifyToken/Auth");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const user = await Signup.findOne({ email });
  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Signup({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({ message: "user create successfully!!!" });
  }
  res.status(400).json({ message: "user already Exist" });
});

//CREATE A NEW TOKEN

router.post("/signupToken", async (req, res) => {
  const { password, email } = req.body;

  const user = await Signup.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "user not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(400).json({ message: "Incorrect password" });
  }
  const token = generateToken(user);

  res.json({ token });
});

//TOKEN VERIFY

const verifyToken = require("../VerifyToken/Verify");
router.get("/token", verifyToken, (req, res) => {
  res.json({ message: `welcom,${req.user.email}! This is protected data` });
});
router.get("/signup", async (req, res) => {
  try {
    const sign = await Signup.find();
    res.status(200).json(sign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
