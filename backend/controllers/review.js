const e = require("express");
const Review = require("../models/review");
const nodemailer = require("nodemailer");

exports.addReview = async (req, res) => {
  const { username, productName, description, review, rating, productLink } =
    req.body;

  const newReview = new Review({
    username,
    productName,
    description,
    review,
    rating,
    productLink,
  });

  try {
    await newReview.save();
    return res.status(200).json({ message: "Review added" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Review not added" });
  }
};

exports.getUserReviews = async (req, res) => {
  const { username } = req.params;
  try {
    const reviews = await Review.find({ username: username });
    return res.status(200).json({ reviews });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Reviews not found" });
  }
};

exports.editReview = async (req, res) => {
  const { id, productName, description, review, rating } = req.body;

  if (!id || !productName || !description || !review || !rating) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const rev = await Review.findById(id);
    rev.productName = productName;
    rev.description = description;
    rev.review = review;
    rev.rating = rating;
    await rev.save();
    return res.status(200).json({ message: "Review updated" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Review not updated" });
  }
};

exports.deleteReview = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    await Review.findByIdAndDelete(id);
    return res.status(200).json({ message: "Review deleted" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Review not deleted" });
  }
};

exports.searchReviews = async (req, res) => {
  const { username, searchQuery } = req.body;

  if (!username || !searchQuery) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const reviews = await Review.find({
      $or: [
        { productName: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { review: { $regex: searchQuery, $options: "i" } },
      ],
      username: { $ne: username },
    });

    return res.status(200).json({ reviews });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Reviews not found" });
  }
};

exports.contactUs = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "plasticawaycontact@gmail.com",
        pass: process.env.GMAIL_PASS,
      },
    });

    // Define the email options
    const mailOptions = {
      from: "plasticawaycontact@gmail.com",
      to: "jack.darley10@icloud.com", // Replace with your email address
      subject: "PlasticAway Message",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    return res.status(200).json({ message: "Message sent" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Message not sent" });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    return res.status(200).json({ reviews });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Reviews not found" });
  }
};
