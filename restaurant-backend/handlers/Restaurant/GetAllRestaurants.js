const Restaurant = require("../../models/RestaurantModel");

const getAllRestaurants = async (req, res, next) => {
  let restaurants;
  try {
    restaurants = await Restaurant.find().exec();

    if (!restaurants)
      return res.json({
        message: "No restaurants found!",
      });
  } catch (err) {
    return res.json({
      message: "Error! Could not get restaurants!",
      err: err,
    });
  }
  res.json({
    message: "restaurants:",
    restaurants: restaurants,
  });
};
module.exports = getAllRestaurants;
