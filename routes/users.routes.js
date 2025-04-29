const {
  createUser,
  getAllUsers,
  getUserById,
  removeUserById,
  updateUserById,
  getUsersByRole,
  getUsersByAnyParams,
  getStadionsByOwner,
  findReviewByPhone
} = require("../controllers/users.controller");

const router = require("express").Router();

router.post("/create", createUser);
router.get("/all", getAllUsers);
router.get("/role", getUsersByRole);
router.get("/any", getUsersByAnyParams);
router.get("/ownerstadiums", getStadionsByOwner);
router.get("/usersreview", findReviewByPhone);
router.get("/:id", getUserById);
router.delete("/:id", removeUserById);
router.patch("/:id", updateUserById);

module.exports = router;
