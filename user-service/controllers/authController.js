import models from "../models/index.js";
import createError from "http-errors";
import bcrypt from 'bcrypt';

const User = models.user;

export const register = async (req, res) => {
  // console.log(req.body);
  const { userName, email, password, mobile, address } = req.body;
  
  try {
    const doesExists = await User.findOne({ email: email });
    if (doesExists)
      throw createError.Conflict(
        `A user with this ${email} email already exists!!`
      );
    let user = new User({ userName, email, password,mobile,address });
    user = await user.save();

    res.status(201).json({
      Message:
        "User registered successfully \n Check your email to verify your account",
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw createError.NotFound(
        `User with this ${email} emailId does not exist !!`
      );
    }

    const isMatch = await user.isValidPassword(password);
    if (!isMatch) throw createError.Unauthorized("Username/password not valid");

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

    res.status(200).json({ message: "Login successful", token: token, userId: user._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
