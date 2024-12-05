const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");
const RequestError = require("../helper/ctrlWrapper");

const authMiddelwar = async (req, res, next) => {
  
  const { authorization = "" } = req.headers;
  if (!authorization) {
    return next(RequestError(401, "Not authorized"));
  }

  const [bearer = "", token = ""] = authorization.split(" ");
  
  
  if (bearer !== "Bearer") {
    return next(RequestError(401, "Invalid token"));
  }

  if (!token) {
    return next(RequestError(401, "Not authorized"));
  }
  try {
    const decode = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decode.id);
    if (!user) {
      return next(RequestError(404, "Not found user"));
    }
console.log(user._id)
    req.user = user;
    next();
  } catch (error) {
    next(RequestError(401, error.message));
  }
};

module.exports = authMiddelwar