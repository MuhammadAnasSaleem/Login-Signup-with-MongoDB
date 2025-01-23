import express from "express";
import "dotenv/config";
import "./database.js";
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
const app = express();
const port = 3000;
import { User } from "./models/model.js";

app.use(cookieParser());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;

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
    res.status(400).send({ message: error.details[0].message });
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

    const { password, __v, ...userWithOutPassword } = result.toObject();

    res
      .status(201)
      .send({ message: "SignUp successfully", data: userWithOutPassword });
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
  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
  res
    .cookie("myToken", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      sameSite: "Strict", // You can try changing this to "Lax" if you're using CORS with different origins
    })
    .status(200)
    .send({ message: "Login SuccessFully!", token: token });
});

const authenticateToken = (req, res, next) => {
  try {
    const token = req.cookies.myToken;
    if (!token) {
      return res.status(401).send({ message: "Token missing hai" });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res
          .status(403)
          .send({ message: "Token invalid ya expire ho gaya hai" });
      }
      req.user = user; // Attach user information to the request
      next(); // Proceed to the next middleware or route handler
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(400)
      .send({ message: "Error in authentication", error: error.message });
  }
};

app.get("/api/v1/protected", authenticateToken, (req, res) => {
  res.send({ message: "This is a protected route", user: req.user });
});
app.get("/", (req, res) => {
  res.send("Api working!");
});
app.post("/api/v1/logout", (req, res) => {
  res.clearCookie("myToken", { httpOnly: true });
  res.status(200).send({ message: "Logged out successfully" });
});
app.use((request, response) => {
  response.status(404).send({ message: "no route found!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
