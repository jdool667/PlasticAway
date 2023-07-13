const mongoose = require("mongoose");

const registerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    resetPassword: {
      type: String,
      default: "",
    },
    resetPasswordExpiration: {
      type: Date,
      default: null,
    },
    loginToken: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Register", registerSchema);
