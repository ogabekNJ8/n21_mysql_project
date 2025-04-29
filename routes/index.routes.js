
const router = require("express").Router();

const usersRouter = require("./users.routes");
const stadiumRouter = require("./stadion.routes"); //stadion routerini ulash

router.use("/users", usersRouter);
router.use("/stadions", stadiumRouter); // stadions endpointi qo'shildi

module.exports = router