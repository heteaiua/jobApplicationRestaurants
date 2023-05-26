const Restaurant = require("../../models/RestaurantModel");

const updateRestaurant = async (req, res, next) => {
  let restaurants;
  try {
    restaurants = await Restaurant.findByIdAndUpdate(
      { _id: req.params.restaurantId },
      {
        name: req.body.name,
        schedule: req.body.schedule,
        minimumOrder: req.body.minimumOrder,
        standardDeliveryMaximumDistance:
          req.body.standardDeliveryMaximumDistance,
        standardDeliceryPrice: req.body.standardDeliceryPrice,
        extraDeliveryFee: req.body.extraDeliveryFee,
        items: req.body.items,
      }
    );

    if (!restaurants)
      return res.json({
        message: "No restaurants found!",
      });
  } catch (err) {
    return res.json({
      message: "Error! Could not update restaurants!",
      err: err,
    });
  }
  res.json({
    message: "restaurants:",
    restaurants: restaurants,
  });
};
module.exports = updateRestaurant;
