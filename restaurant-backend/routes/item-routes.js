const express = require("express");
const createItem = require("../handlers/Item/NewItem");
const getAllItems = require("../handlers/Item/GetAllItems");
const getItemById = require("../handlers/Item/GetItemById");
const updateItem = require("../handlers/Item/UpdateItem");
const deleteItem = require("../handlers/Item/DeleteItem");
const router = express.Router();

router.post("/newItem", createItem);
router.get("/getAllItems", getAllItems);
router.get("/getItemById/:itemId", getItemById);
router.patch("/updateItem/:itemId", updateItem);
router.delete("/deleteItem/:itemId", deleteItem);

module.exports = router;
