const express = require("express");
const createOrder = require("../handlers/Order/NewOrder");
const getAllOrders = require("../handlers/Order/GetAllOrders");
const getOrderById = require("../handlers/Order/GetOrderById");
const updateOrder = require("../handlers/Order/UpdateOrder");
const deleteOrder = require("../handlers/Order/DeleteOrder");
const router = express.Router();

router.post("/newOrder", createOrder);
router.get("/getAllOrders", getAllOrders);
router.get("/getOrderById/:orderId", getOrderById);
router.patch("/updateOrder/:orderId", updateOrder);
router.delete("/deleteOrder/:orderId", deleteOrder);

module.exports = router;
