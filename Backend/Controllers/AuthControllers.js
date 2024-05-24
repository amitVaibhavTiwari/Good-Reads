import jwt from "jsonwebtoken";
import "dotenv/config";
import userModel from "../Models/User.js";
import bcrypt from "bcrypt";

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
};
//
//
//
//
// All the controller functions starting from below

export const registerUser = async (req, res) => {
  try {
    const { password, email } = req.body;
    // Checking if the user already exists
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists for the email" });
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      ...req.body,
      password: hashedPassword,
    };
    const user = await userModel.create(newUser);
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: false,
      //   if secure is set to true, it will not work over http it will work only over https so for development it's set to false, for production set it to true.
      secure: false,
      //   cookie will expire after the token has expired so user will have to login again :-)
      maxAge: maxAge * 1000,
    });

    res
      .status(201)
      .json({ userId: user._id, userName: user.firstName, created: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, created: false });
  }
};
//
//
//
//
//
// to get user's details
export const getUserDetails = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    if (user) {
      return res
        .status(200)
        .json({ userName: user.firstName, userId: user._id, found: true });
    } else {
      return res.status(404).json({ message: "no user found", found: false });
    }
  } catch (error) {
    res.status(500).json({ message: err.message, found: false });
  }
};
//
//
//
//
//
// To login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    // If there exists such user
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const token = createToken(user._id);

      res.cookie("jwt", token, {
        httpOnly: false,
        maxAge: maxAge * 1000,
        secure: false,
      });
      res.status(200).json({
        message: "Login successful",
        userName: user.firstName,
        userId: user._id,
      });
    } else {
      // if no such user
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
