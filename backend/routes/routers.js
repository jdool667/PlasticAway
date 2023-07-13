const express = require("express");
const router = express.Router();
const {
  register,
  login,
  resetPassword,
  checkToken,
  changePassword,
  signOut,
  deleteUser,
} = require("../controllers/auth");
const { updatePassword } = require("../middleware/email");
const {
  addReview,
  getUserReviews,
  editReview,
  deleteReview,
  searchReviews,
  contactUs,
  getReviews,
} = require("../controllers/review");

router.post("/", checkToken);
router.post("/register", register);
router.post("/login", login);
router.post("/login/reset", resetPassword);
router.post("/login/reset/code", updatePassword);
router.post("/addReview", addReview);
router.get("/getReviews/:username", getUserReviews);
router.get("/:username", getReviews);
router.post("/editReview", editReview);
router.post("/deleteReview", deleteReview);
router.post("/searchReviews", searchReviews);
router.post("/changePassword", changePassword);
router.post("/signout", signOut);
router.post("/contactUs", contactUs);
router.post("/deleteUser", deleteUser);

module.exports = router;
