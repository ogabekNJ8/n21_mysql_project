const {
  getAllImages,
  createImage,
  getImageById,
  updateImageById,
  removeImageById,
} = require("../controllers/images.controller");

const router = require("express").Router();

router.post("/", createImage);
router.get("/", getAllImages);
router.get("/:id", getImageById);
router.patch("/:id", updateImageById);
router.delete("/:id", removeImageById);

module.exports = router;
