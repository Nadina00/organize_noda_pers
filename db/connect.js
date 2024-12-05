const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set('strictQuery', false);

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Подключение к базе данных успешно");
  } catch (error) {
    console.error("Ошибка подключения к MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = { connectMongo };
