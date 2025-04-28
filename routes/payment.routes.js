const {
  getAllPayments,
  createPayment,
  getPaymentById,
  updatePaymentById,
  removePaymentById,
} = require("../controllers/payment.controller");

const router = require("express").Router();

router.post("/", createPayment);
router.get("/", getAllPayments);
router.get("/:id", getPaymentById);
router.patch("/:id", updatePaymentById);
router.delete("/:id", removePaymentById);

module.exports = router;
