const Item = require("../../models/ItemModel");

const updateItem = async (req, res, next) => {
  let items;
  try {
    items = await Item.findByIdAndUpdate(
      { _id: req.params.itemId },
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
      }
    );

    if (!items)
      return res.json({
        message: "No items found!",
      });
  } catch (err) {
    return res.json({
      message: "Error! Could not update items!",
      err: err,
    });
  }
  res.json({
    message: "items:",
    items: items,
  });
};
module.exports = updateItem;
