const {
  getAllBookings,
  createBooking,
  getBookingById,
  updateBookingById,
  removeBookingById,
} = require("../controllers/booking.controller");

const router = require("express").Router();

router.post("/", createBooking);
router.get("/", getAllBookings);
router.get("/:id", getBookingById);
router.patch("/:id", updateBookingById);
router.delete("/:id", removeBookingById);

module.exports = router;
