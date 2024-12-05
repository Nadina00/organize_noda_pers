const app = require("./app");
const PORT = process.env.PORT || 5000;

require("dotenv").config();
const { connectMongo } = require("./db/connect");

const start = async () => {
  await connectMongo();
  app.listen(PORT, () => {
    console.log("Database connection successful");
  });
};

start();
