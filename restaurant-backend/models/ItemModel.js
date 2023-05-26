const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, require: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Item", itemSchema); //returneaza un constuctor
