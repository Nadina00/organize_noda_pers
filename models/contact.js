const Schema = require('mongoose').Schema;
const {model} = require("mongoose")
const mongoose = require('mongoose');

const contactSchema = new Schema(
  {
    id: {
        type: String
    },
    name: {
      type: String,
    },
    tel: {
      type: Number,
    },
    email: {
      type: String,
    },
    commit: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Посилання на користувача
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
const Contact = model("Contact", contactSchema);

module.exports = { Contact };