const express = require('express');
const router = express.Router();
const ctrlWrapper = require('../helper/ctrlWrapper');
const {
  contactAdd,
  contactDel,
  contactsList
} = require("../controller/contact/contactController");
const authMiddelwar = require('../middelwares/authMiddelwar');

router.post("/", authMiddelwar, ctrlWrapper(contactAdd));
router.delete("/:id",  ctrlWrapper(contactDel));
router.get("/", authMiddelwar, ctrlWrapper(contactsList));

module.exports = router;

