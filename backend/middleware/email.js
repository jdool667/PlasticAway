const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Register = require("../models/register");
const crypto = require("crypto");

exports.sendEmail = async (randomNumber, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "plasticawaycontact@gmail.com",
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "plasticawaycontact@gmail.com",
    to: email,
    subject: "Reset Password",
    html: `<h2>Please enter the code below in your app to reset your password. It will reset in 15 minutes.</h2>
    <p>${randomNumber}</p>`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error" + error);
        reject(error);
      } else {
        resolve({ emailResponse: info.response });
      }
    });
  });
};

exports.updatePassword = async (req, res) => {
  const { email, code, password, password2 } = req.body;

  if (code) {
    const hashedNumber = await crypto
      .createHash("sha256")
      .update(code.toString())
      .digest("hex");

    const user = await Register.findOne({ resetPassword: hashedNumber });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    if (user.email !== email) {
      return res.status(400).json({ message: "Email does not match" });
    }

    // Check if the hashed number has expired
    if (
      user.resetPasswordExpiration &&
      user.resetPasswordExpiration < Date.now()
    ) {
      return res
        .status(400)
        .json({ message: "Reset code has expired. Please request a new one." });
    }

    try {
      if (password !== password2) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters" });
      }

      const p1Hash = await bcrypt.hash(password, 10);

      await user.updateOne({
        password: p1Hash,
        resetPassword: "",
        resetPasswordExpiration: null,
      });

      res.json({ message: "Password updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
};
