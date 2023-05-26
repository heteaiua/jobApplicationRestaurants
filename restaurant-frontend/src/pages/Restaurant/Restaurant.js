import * as React from "react";
import { useState, useEffect } from "react";
import "./Restaurant.css";
import { styled } from "@mui/material/styles";

import {
  Paper,
  Link,
  TextField,
  Button,
  ButtonBase,
  Grid,
  Box,
  Modal,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

const styleM = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const paperStyle = {
  padding: 20,
  heigth: "50vh",
  width: 300,
  margin: "5px auto",
};
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
const style = { margin: "10px" };
const btnStyle = { margin: "8px 0px" };
const columns = [
  // { field: "id", headerName: "ID", type: "number" },
  { field: "name", headerName: "Name", width: 300 },
  {
    field: "schedule",
    headerName: "schedule",
    width: 300,
  },
  {
    field: "minimumOrder",
    headerName: "minimumOrder",
    width: 300,
    type: "number",
  },
  {
    field: "standardDeliveryMaximumDistance",
    headerName: "standardDeliveryMaximumDistance",
    width: 300,
    type: "number",
  },
  {
    field: "standardDeliceryPrice",
    headerName: "standardDeliceryPrice",
    width: 300,
    type: "number",
  },
  {
    field: "extraDeliveryFee",
    headerName: "extraDeliveryFee",
    width: 300,
  },
];

export default function Restaurants() {
  const [Name, setName] = useState("");
  const [Schedule, setSchedule] = useState("");
  const [MinimumOrder, setMinimumOrder] = useState("");
  const [standardDeliveryMaximumDistance, setStandardDeliveryMaximumDistance] =
    useState("");
  const [standardDeliceryPrice, setStandardDeliceryPrice] = useState("");
  const [extraDeliveryFee, setExtraDeliveryFee] = useState("");
  const [items, setitems] = useState("");
  const [userId, setUserId] = useState("");
  const [restaurantUser, setRestaurantUser] = useState("");
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);

  const [tableData, setTableData] = useState([]);
  const [selectedIndexs, setSelectedIndexes] = useState([]);
  const [initialValue, setInitialValue] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState({});
  const [tableDataRestaurant, setTableDataRestaurant] = useState([]);
  const [chosenRestaurant, setChosenRestaurant] = useState("");
  const [selectedRestaurantName, setSelectedRestaurantName] = useState("");

  const [orderName, setOrderName] = useState("");
  const [orderAddress, setOrderAddress] = useState("");
  const [orderDistance, setOrderDistance] = useState("");
  const [orderMentions, setorderMentions] = useState("");

  const handleOrderName = (e) => {
    setOrderName(e.target.value);
  };
  const handleOrderAddress = (e) => {
    setOrderAddress(e.target.value);
  };
  const handleOrderDistance = (e) => {
    setOrderDistance(e.target.value);
  };
  const handleOrderMentions = (e) => {
    setorderMentions(e.target.value);
  };

  const handleUserId = (e) => {
    setUserId(e.target.value);
  };

  const renderSelectedRestaurant = () => {
    const selectedRestaurant = tableDataRestaurant.find(
      (restaurant) => restaurant.restaurantId === chosenRestaurant
    );
    return selectedRestaurant ? selectedRestaurant.name : "";
  };

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleSchedule = (e) => {
    setSchedule(e.target.value);
  };
  const handleMinimumOrder = (e) => {
    setMinimumOrder(e.target.value);
  };
  const handleChosenRestaurant = (e) => {
    setChosenRestaurant(e.target.value);
  };
  const handleStandardDeliveryMaximumDistance = (e) => {
    setStandardDeliveryMaximumDistance(e.target.value);
  };
  const handleStandardDeliceryPrice = (e) => {
    setStandardDeliceryPrice(e.target.value);
  };
  const handleExtraDeliveryFee = (e) => {
    setExtraDeliveryFee(e.target.value);
  };
  const handleItems = (e) => {
    setitems(e.target.value);
  };
  useEffect(() => {
    let restaurantUser = localStorage.getItem("user");
    if (restaurantUser) {
      setRestaurantUser(restaurantUser);
      console.log("restaurantUserID", restaurantUser);
    }
  }, []);

  const handleGetAllRestaurants = async () => {
    await fetch("http://localhost:8000/restaurant/getAllRestaurants", {
      method: "GET",
      headers: {
        Authorization: "state.token",
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("getAllRestaurants", data);
        const selectOptions = data.restaurants.map(
          ({
            name,
            schedule,
            _id,
            extraDeliveryFee,
            minimumOrder,
            standardDeliceryPrice,
            standardDeliveryMaximumDistance,
          }) => ({
            // id: index + 1,
            name: name,
            schedule: schedule,
            id: _id,
            extraDeliveryFee: extraDeliveryFee,
            minimumOrder: minimumOrder,
            standardDeliceryPrice: standardDeliceryPrice,
            standardDeliveryMaximumDistance: standardDeliveryMaximumDistance,
          })
        );
        console.log("selectOptions", selectOptions);
        setTableData(selectOptions);
        //setId(data.data[0]._id);
      });
  };

  useEffect(() => {
    console.log("table data name", tableData);
  }, [tableData]);

  useEffect(() => {
    handleGetAllRestaurants();
  }, []);

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    const orderCall = await fetch("http://localhost:8000/order/newOrder", {
      method: "POST",
      headers: {
        Authorization: "state.token",
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name: orderName,
        address: orderAddress,
        distance: orderDistance,
        orderMentions: orderMentions,
        restaurant: selectedIndexs,
        user: restaurantUser,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log("create", data));
  };

  return (
    <form>
      <div className="space">
        <h1>Welcome, you can view all restaurants!</h1>
      </div>
      <div className="buttonAppliance">
        <Button className="btn" onClick={handleOpen}>
          Create Order
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleM}>
          <div id="content-appliance">
            <header></header>
            <Grid align="center" marginTop={5}>
              <TextField
                style={style}
                id="standard-helperText"
                variant="standard"
                label="Order Name"
                defaultValue=""
                type="text"
                onChange={handleOrderName}
                fullWidth
              />
              <TextField
                style={style}
                id="standard-helperText"
                variant="standard"
                label="Address"
                defaultValue=""
                type="text"
                onChange={handleOrderAddress}
                fullWidth
              />
              <TextField
                style={style}
                id="standard-helperText"
                variant="standard"
                label="Distance"
                defaultValue=""
                type="text"
                onChange={handleOrderDistance}
                fullWidth
              />

              <TextField
                style={style}
                id="standard-helperText"
                variant="standard"
                label="Mentions"
                defaultValue=""
                type="text"
                onChange={handleOrderMentions}
                fullWidth
              />

              <FormControl sx={{ m: 5, minWidth: 30 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  restaurant
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  defaultValue=""
                  value={chosenRestaurant}
                  label="Flat"
                  onChange={handleChosenRestaurant}
                  renderValue={renderSelectedRestaurant}
                >
                  {tableData.map((restaurant) => (
                    <MenuItem
                      key={restaurant.orderId}
                      value={restaurant.orderId}
                    >
                      {restaurant.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select the order</FormHelperText>
              </FormControl>

              <Button
                style={btnStyle}
                type="submit"
                variant="contained"
                onClick={handleCreateOrder}
              >
                New Order
              </Button>
            </Grid>
          </div>
        </Box>
      </Modal>
      <div styleM={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={tableData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={(itm) => {
            setSelectedIndexes(itm);
            console.log("indexes: " + itm);
          }}
        />
      </div>
    </form>
  );
}
