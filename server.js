import express from "express";
import "dotenv/config";
import "./database.js";
const app = express();
const port = 3000;
import { User } from "./models/model.js";

app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    res.status(400).send({ message: `parameters missing` });
  }
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).send({ message: "Account Already exist" });
    return;
  }
  try {
    const result = await User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    });

    res.status(201).send({ message: "SignUp successfully", data: result });
  } catch (error) {
    res
      .status(500)
      .send({ message: "error creating user", error: error.message });
  }
});
app.post("/api/v1/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).send({ message: "Invalid credentials" });
  }

  if (user.password !== req.body.password) {
    res.status(400).send({ message: "Invalid credentials" });
  }
  res.status(200).send({ message: "Login SuccessFully!" });
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
