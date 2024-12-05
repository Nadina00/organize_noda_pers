const express = require('express');
const router = express.Router();
const ctrlWrapper = require('../helper/ctrlWrapper');
const {
  eventAdd,
  eventDel,
  eventList
} = require("../controller/event/eventController");
const authMiddelwar = require('../middelwares/authMiddelwar');

router.post("/", authMiddelwar, ctrlWrapper(eventAdd));
router.delete("/:id", ctrlWrapper(eventDel));
router.get("/", authMiddelwar, ctrlWrapper(eventList));

module.exports = router;

