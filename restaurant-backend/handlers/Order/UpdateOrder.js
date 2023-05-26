const Order = require("../../models/OrderModel");

const updateOrder = async (req, res, next) => {
  let orders;
  try {
    orders = await Order.findByIdAndUpdate(
      { _id: req.params.orderId },
      {
        name: req.body.name,
        address: req.body.address,
        distance: req.body.distance,
        orderMentions: req.body.orderMentions,
        restaurant: req.body.restaurant,
        user: req.body.user,
      }
    );

    if (!orders)
      return res.json({
        message: "No orders found!",
      });
  } catch (err) {
    return res.json({
      message: "Error! Could not update items!",
      err: err,
    });
  }
  res.json({
    message: "items:",
    orders: orders,
  });
};
module.exports = updateOrder;
