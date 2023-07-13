const Register = require("../models/register");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Email = require("../middleware/email");
const Review = require("../models/review");

exports.register = async (req, res) => {
  const { name, username, email, password, password2 } = req.body;

  if (!name || !username || !email || !password || !password2) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  if (
    email.indexOf("@") === -1 ||
    email.indexOf(".") === -1 ||
    email.length < 6
  ) {
    return res.status(400).json({ message: "Please enter a valid email" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  const emailExists = await Register.findOne({ email });
  if (emailExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const usernameExists = await Register.findOne({ username });
  if (usernameExists) {
    return res.status(400).json({ message: "Username already exists" });
  }

  if (password !== password2) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const p1Hash = await bcrypt.hash(password, 10);

  const token = jwt.sign({}, process.env.JWT_KEY, { expiresIn: "28d" });

  const newUser = new Register({
    name,
    username,
    email,
    password: p1Hash,
    loginToken: token,
  });

  await newUser.save();

  res.json({ message: "User registered successfully", token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  const user = await Register.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({}, process.env.JWT_KEY, { expiresIn: "28d" });

  user.loginToken = token;

  await user.save();

  res.json({
    message: "User logged in successfully",
    username: user.username,
    token,
  });
};

exports.resetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Please enter your email" });
  }

  const user = await Register.findOne({ email });

  if (user) {
    try {
      // Generate random 6-digit number
      const randomNumber = Math.floor(100000 + Math.random() * 900000);

      // Hash the random number for storage
      const hashedNumber = crypto
        .createHash("sha256")
        .update(randomNumber.toString())
        .digest("hex");

      // Set the expiration time to 15 minutes from now
      const expirationTime = new Date(Date.now() + 15 * 60 * 1000);

      // Update the user's document with the hashed number and expiration time
      await user.updateOne({
        resetPassword: hashedNumber,
        resetPasswordExpiration: expirationTime,
      });

      const emailResponse = await Email.sendEmail(randomNumber, email);

      if (emailResponse) {
        return res.status(200).json({ message: "Email sent" });
      } else {
        return res.status(400).json({ message: "Email not sent" });
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(400).json({ message: "User does not exist" });
  }
};

exports.checkToken = async (req, res) => {
  const token = req.body.token;

  const user = await Register.findOne({ token });

  if (user) {
    return res
      .status(200)
      .json({ message: "Token is valid", username: user.username });
  } else {
    return res.status(400).json({ message: "Token is invalid" });
  }
};

exports.changePassword = async (req, res) => {
  const { username, password, password2 } = req.body;

  if (!username || !password || !password2) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  if (password !== password2) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const user = Register.findOne({ username });

  if (user) {
    const p1Hash = await bcrypt.hash(password, 10);

    await user.updateOne({ password: p1Hash });

    return res.status(200).json({ message: "Password changed successfully" });
  }

  return res.status(400).json({ message: "User not found" });
};

exports.signOut = async (req, res) => {
  const username = req.body.username;

  const user = await Register.findOne({ username });

  if (user) {
    user.loginToken = "";
    await user.save();
    return res.status(200).json({ message: "User signed out successfully" });
  }

  return res.status(400).json({ message: "User not found" });
};

exports.deleteUser = async (req, res) => {
  const username = req.body.username;

  try {
    const user = await Register.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    await Review.deleteMany({ username: username });

    await Register.deleteOne({ username });

    return res
      .status(200)
      .json({ message: "User account deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the user account" });
  }
};
