const {
  getStadionAll,
  createStadion,
  getOneStadionById,
  removeStadionById,
  updateStadionById,
} = require("../controllers/stadion.controller");

const router = require("express").Router();

router.post("/create", createStadion);
router.get("/all", getStadionAll);
router.get("/:id", getOneStadionById);
router.delete("/:id", removeStadionById);
router.patch("/:id", updateStadionById);

module.exports = router;
