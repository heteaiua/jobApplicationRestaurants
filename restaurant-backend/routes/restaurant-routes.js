const express = require("express");
const createRestaurant = require("../handlers/Restaurant/NewRestaurant");
const getAllRestaurants = require("../handlers/Restaurant/GetAllRestaurants");
const getRestaurantById = require("../handlers/Restaurant/GetRestaurantsById");
const updateRestaurant = require("../handlers/Restaurant/UpdateRestaurant");
const deleteRestaurant = require("../handlers/Restaurant/DeleteRestaurant");
const router = express.Router();

router.post("/newRestaurant", createRestaurant);
router.get("/getAllRestaurants", getAllRestaurants);
router.get("/getRestaurantById/:restaurantId", getRestaurantById);
router.patch("/updateRestaurant/:restaurantId", updateRestaurant);
router.delete("/deleteRestaurant/:restaurantId", deleteRestaurant);

module.exports = router;
