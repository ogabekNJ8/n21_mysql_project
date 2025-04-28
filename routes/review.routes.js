const {
  getAllReviews,
  createReview,
  getReviewById,
  updateReviewById,
  removeReviewById,
} = require("../controllers/review.controller");

const router = require("express").Router();

router.post("/", createReview);
router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.patch("/:id", updateReviewById);
router.delete("/:id", removeReviewById);

module.exports = router;
