const Restaurant = require("../../models/RestaurantModel");

const getRestaurantById = async (req, res, next) => {
  const restaurantId = req.params.restaurantId;
  let restaurants;
  try {
    restaurants = await Restaurant.findById(restaurantId);
    console.log(restaurants);
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
    message: "restaurants",
    restaurants: restaurants,
  });
};
module.exports = getRestaurantById;
