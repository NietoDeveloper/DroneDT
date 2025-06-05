import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

function createToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET);
}

// Route for user login
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    // Check if email exist
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Login error: " + error.message });
  }
}

// Route for user registration
async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    // Check if email exist
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User already exist" });
    }
    // Validate email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    // Validate strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    // Hashing user's password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
    });
    const user = await newUser.save();
    const token = createToken(user.id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// Route for admin login
async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

export { loginUser, registerUser, adminLogin };
