const express = require("express");
const Restaurant = require("../../models/RestaurantModel");
const createRestaurant = async (req, res, next) => {
  const {
    name,
    schedule,
    minimumOrder,
    standardDeliveryMaximumDistance,
    standardDeliceryPrice,
    extraDeliveryFee,
    items,
  } = req.body;

  let createdRestaurant;
  try {
    const restaurants = await Restaurant.find().exec();
    createdRestaurant = new Restaurant({
      name,
      schedule,
      minimumOrder,
      standardDeliveryMaximumDistance,
      standardDeliceryPrice,
      extraDeliveryFee,
      items,
    });
    await createdRestaurant.save();
  } catch (err) {
    res.status(500).json("restaurants create has failed!");
  }
  res.json({
    message: "New restaurants added!",
    restaurants: createdRestaurant,
  });
};

module.exports = createRestaurant;
