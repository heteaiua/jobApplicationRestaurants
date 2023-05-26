const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Order = new Schema({
  name: { type: String, require: true },
  address: { type: String, required: true },
  distance: { type: Number, required: true },
  orderMentions: { type: String, required: true },
  restaurant: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "Restaurant",
  },
  user: { type: mongoose.Types.ObjectId, require: true, ref: "User" },
  items: [{ type: mongoose.Types.ObjectId, require: true, ref: "Item" }],
});

module.exports = mongoose.model("Order", Order); //returneaza un constuctor
