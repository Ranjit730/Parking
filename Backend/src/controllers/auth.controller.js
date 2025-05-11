import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const Register = async (req, res) => {
  let { name, email, password } = req.body;
  console.log(req.body);

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    // Hash the password
    let hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    let newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new user
    await newUser.save();

    // Generate JWT token (IMPORTANT: use newUser, not user!)
    let token = jwt.sign(
      { email: newUser.email, _id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Registered successfully",
      token,
      success: true,
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false, error });
  }
};

// LOGIN
export const Login = async (req, res) => {
  let { email, password } = req.body;

  try {
    let errorMsg = "Email or password does not match";

    // Find user
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    // Check password
    let match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    // Generate token
    let token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false, error });
  }
};
