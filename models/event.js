const Schema = require('mongoose').Schema;
const {model} = require("mongoose")
const mongoose = require('mongoose');

const eventSchema = new Schema(
  {
    id: {
        type: String
    },
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
    title: {
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
const Event = model("Event", eventSchema);

module.exports = { Event };