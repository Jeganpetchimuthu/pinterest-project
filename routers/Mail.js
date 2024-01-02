const express = require("express");

const router = express.Router();

const nodemailer = require("nodemailer");

const sender = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jeganpetchimuthu1996@gmail.com",
    pass: "vugmahbnxlzxptgr",
  },
});
router.post("/mail", (req, res) => {
  const composemail = {
    from: "jeganpetchimuthu1996@gmail.com",
    to: "arunjegan1996@gmail.com",
    subject: "Pinterest",
    text: "Hai Are You Like This Pinterest App",
  };
  sender.sendMail(composemail, (error, info) => {
    if (error) {
      res.status(400).json({ message: "something went wrong, try again " });
    }
    res.status(200).json({ message: "Email Send" });
  });
});
module.exports = router;
