const Order = require("../../models/OrderModel");

const getAllOrders = async (req, res, next) => {
  let orders;
  try {
    orders = await Order.find().exec();

    if (!orders)
      return res.json({
        message: "No orders found!",
      });
  } catch (err) {
    return res.json({
      message: "Error! Could not get orders!",
      err: err,
    });
  }
  res.json({
    message: "orders:",
    orders: orders,
  });
};
module.exports = getAllOrders;
