const express = require('express');
const router = express.Router();
const authMiddelwar = require("../middelwares/authMiddelwar")
const ctrlWrapper = require('../helper/ctrlWrapper');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

const {
register, logIn, logOut, currentUser
 
} = require("../controller/auth/authController");

router.post("/register", ctrlWrapper(register));
router.post("/login", ctrlWrapper(logIn));
router.get("/logOut", authMiddelwar, ctrlWrapper(logOut))
router.get("/current", authMiddelwar, ctrlWrapper(currentUser));


module.exports = router;