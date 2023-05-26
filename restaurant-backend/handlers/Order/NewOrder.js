const express = require("express");
const Order = require("../../models/OrderModel");
const createOrder = async (req, res, next) => {
  const { name, address, distance, orderMentions, restaurant, user } = req.body;

  let createdOrder;
  try {
    const orders = await Order.find().exec();
    createdOrder = new Order({
      name,
      address,
      distance,
      orderMentions,
      restaurant,
      user,
    });
    await createdOrder.save();
  } catch (err) {
    res.status(500).json(" Order has failed!");
  }
  res.json({
    message: "New Order added!",
    Order: createdOrder,
  });
};

module.exports = createOrder;
