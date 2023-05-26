const express = require("express");
const Item = require("../../models/ItemModel");
const createItem = async (req, res, next) => {
  const { name, description, price } = req.body;

  let createdItem;
  try {
    const items = await Item.find().exec();
    createdItem = new Item({
      name,
      description,
      price,
    });
    await createdItem.save();
  } catch (err) {
    res.status(500).json("Item create has failed!");
  }
  res.json({
    message: "New Item added!",
    Item: createdItem,
  });
};

module.exports = createItem;
