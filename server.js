import express from "express";
import "dotenv/config";
import "./database.js";
import bcrypt from "bcrypt";
import Joi from "joi";
const app = express();
const port = 3000;
import { User } from "./models/model.js";

app.use(express.json());

const signupSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

app.post("/api/v1/signup", async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    res.status(400).send({ message: `parameters missing` });
    return;
    //this check all parameter are available
  }
  const { error } = signupSchema.validate(req.body);
  if (error) {
    res.status(200).send({ message: error.details[0].message });
    return;
    //this check all parameter are correct/valid
  }
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).send({ message: "Account Already exist" });
    return;
    //this check if account already exist or  not
  }
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const result = await User.create({
      name: req.body.name,
      password: hashPassword,
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
    return;
    //this check that if the account with the email user enter exist or not
  }
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    res.status(400).send({ message: "Invalid credentials" });
    return;
    //this check that the password user enter match with the user.password
  }
  res.status(200).send({ message: "Login SuccessFully!" });
});
app.get("/", (req, res) => {
  res.send("Api working!");
});

app.use((request, response) => {
  response.status(404).send({ message: "no route found!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
