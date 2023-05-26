const Item = require("../../models/ItemModel");

const deleteItem = async (req, res, next) => {
  const itemId = req.params.itemId;
  let items;
  try {
    items = await Item.findByIdAndDelete(itemId);
    console.log(items);
    if (!items)
      return res.json({
        message: "No items found!",
      });
  } catch (err) {
    return res.json({
      message: "Error! Could not delete items!",
      err: err,
    });
  }
  res.json({
    message: "items:",
    items: items,
  });
};
module.exports = deleteItem;
