const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("upload "));

require("dotenv").config();
const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, { useNewUrlParser: true });

const con = mongoose.connection;

try {
  con.on("open", () => {
    console.log("mongoDB connected!!!");
  });
} catch (error) {
  console.log("Error: " + error);
}

const PORT = process.env.PORT;

const imageRouter = require("./routers/img");
app.use("/api", imageRouter);

const ProfilePhotoRouter = require("./routers/ProfilePhoto");
app.use("/api", ProfilePhotoRouter);

const userRouter = require("./routers/User");
app.use("/api", userRouter);

const signupRouter = require("./routers/Signup");
app.use("/api", signupRouter);

const mailRouter = require("./routers/Mail");
app.use("/api", mailRouter);

const profileRouter = require("./routers/Profile");
app.use("/api", profileRouter);

const img1Router = require("./routers/img1");
app.use("/api", img1Router);

const img2Router = require("./routers/img2");
app.use("/api", img2Router);

const img3Router = require("./routers/img3");
app.use("/api", img3Router);

const img4Router = require("./routers/img4");
app.use("/api", img4Router);

const img5Router = require("./routers/img5");
app.use("/api", img5Router);

const img6Router = require("./routers/img6");
app.use("/api", img6Router);

const img7Router = require("./routers/img7");
app.use("/api", img7Router);

const img8Router = require("./routers/img8");
app.use("/api", img8Router);

const img9Router = require("./routers/img9");
app.use("/api", img9Router);

const img10Router = require("./routers/img10");
app.use("/api", img10Router);

const createImageRouter = require("./routers/craeteImage");
app.use("/api", createImageRouter);

app.get("/", (req, res) => {
  res.send("welcome!!!!");
});

app.listen(PORT, () => {
  console.log("This Node application is running on port " + PORT);
});
