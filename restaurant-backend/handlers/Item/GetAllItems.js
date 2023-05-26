const Item = require("../../models/ItemModel");

const getAllItems = async (req, res, next) => {
  let items;
  try {
    items = await Item.find().exec();

    if (!items)
      return res.json({
        message: "No items found!",
      });
  } catch (err) {
    return res.json({
      message: "Error! Could not get items!",
      err: err,
    });
  }
  res.json({
    message: "items:",
    items: items,
  });
};
module.exports = getAllItems;
