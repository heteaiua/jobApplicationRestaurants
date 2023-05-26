const Order = require("../../models/OrderModel");

const deleteOrder = async (req, res, next) => {
  const orderId = req.params.orderId;
  let orders;
  try {
    orders = await Order.findByIdAndDelete(orderId);
    console.log(orders);
    if (!orders)
      return res.json({
        message: "No orders found!",
      });
  } catch (err) {
    return res.json({
      message: "Error! Could not delete orders!",
      err: err,
    });
  }
  res.json({
    message: "orders:",
    orders: orders,
  });
};
module.exports = deleteOrder;
