const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Restaurant = new Schema({
  name: { type: String, require: true },
  schedule: { type: String, required: true },
  minimumOrder: { type: Number, required: true },
  standardDeliveryMaximumDistance: { type: Number, required: true },
  standardDeliceryPrice: { type: Number, required: true },
  extraDeliveryFee: { type: Number, required: true },
  //orders: [{ type: mongoose.Types.ObjectId, require: true, ref: "Order" }],
  items: [{ type: mongoose.Types.ObjectId, require: true, ref: "Item" }],
});

module.exports = mongoose.model("Restaurant", Restaurant); //returneaza un constuctor
