const { Event } = require("../../models/event");
const ctrlWrapper = require("../../helper/ctrlWrapper");
const User = require("../../models/user")

const eventAdd = async (req, res, next) => {
  try {
    const { start, end, title } = req.body;
    const { _id } = req.user;
    console.log(_id)
    const user = await User.findById(_id);
    if (!user) {
      return next(RequestError(401, "Unauthorized"));
    }

    if (!start || !title) {
      return res.status(400).json({
        status: "fail",
        message: "Необходимо заполнить все поля: start & title",
      });
    }

    const newEvent = await Event.create({ start, end, title, owner: _id });

    res.status(201).json({
      status: "success",
      result: newEvent,
    });
  } catch (error) {
    console.error("Ошибка при добавлении контакта:", error);
    res.status(500).json({
      status: "error",
      message: "Ошибка на сервере",
    });
  }
};

const eventList = async (req, res, next) => {
  try {
    const { _id } = req.user;
   
    const user = await User.findById(_id);
    if (!user) {
      return next(RequestError(401, "Unauthorized"));
    }
    const result = await Event.find({owner: _id});
    res.status(200).json({
      status: "success",
      code: 200,
      result,
    });
  } catch (error) {
    next(error);
  }
};

const eventDel = async (req, res, next) => {
  console.log(req.params)
  const { id } = req.params;
  const result = await Event.findByIdAndRemove(id);
  console.log(result)
  res.json({
    status: "success",
    code: 200,
    result,
  });
};

module.exports = {
  eventList,
  eventAdd,
  eventDel,
};
