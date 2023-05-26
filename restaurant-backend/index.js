const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const usersRoutes = require("./routes/user-routes");
const itemRoutes = require("./routes/item-routes");
const orderRoutes = require("./routes/order-routes");
const restaurantRoutes = require("./routes/restaurant-routes");
const port = 8000; // Choose the desired port number
const mongoose = require("mongoose");
const dotenv = require("dotenv");
mongoose
  .connect("mongodb+srv://iua:iua@cluster0.yvi2gcl.mongodb.net/", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("connection failed"), console.log(err);
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json({ limit: "400mb" }));
app.use(bodyParser.urlencoded({ limit: "400mb", extended: true }));
app.use("/user", usersRoutes);
app.use("/item", itemRoutes);
app.use("/restaurant", restaurantRoutes);
app.use("/order", orderRoutes);
