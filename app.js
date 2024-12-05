const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require('dotenv').config();

const contactRouter = require("./routes/contact")
const eventRouter = require("./routes/event")
const authRouter = require("./routes/auth");


const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.options('*', cors());
app.use(express.json());


app.use("/contact", contactRouter)
app.use("/event", eventRouter)
app.use("/", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
