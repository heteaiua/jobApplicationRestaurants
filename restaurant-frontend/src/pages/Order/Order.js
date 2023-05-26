import * as React from "react";
import { useState, useEffect } from "react";
import "./Order.css";
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
    field: "address",
    headerName: "address",
    width: 300,
  },
  {
    field: "distance",
    headerName: "distance",
    width: 300,
  },
  {
    field: "orderMentions",
    headerName: "orderMentions",
    width: 300,
  },
  {
    field: "Restaurant",
    headerName: "Restaurant",
    width: 300,
  },
];

export default function Orders() {
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);

  const [tableData, setTableData] = useState([]);
  const [selectedIndexs, setSelectedIndexes] = useState([]);
  const [initialValue, setInitialValue] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [tableDataOrder, setTableDataOrder] = useState([]);
  const [chosenOrder, setChosenOrder] = useState("");
  const [selectedOrderName, setSelectedOrderName] = useState("");

  const [orderName, setOrderName] = useState("");
  const [orderAddress, setOrderAddress] = useState("");
  const [orderDistance, setOrderDistance] = useState("");
  const [orderMentions, setorderMentions] = useState("");
  const [orderUser, setOrderUser] = useState("");
  const [restaurantOrder, setRestaurantOrder] = useState("");

  const handleRestaurantOrder = (e) => {
    setRestaurantOrder(e.target.value);
  };
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

  const renderSelectedOrder = () => {
    const selectedOrder = tableDataOrder.find(
      (Order) => Order.OrderId === chosenOrder
    );
    return selectedOrder ? selectedOrder.name : "";
  };

  const handleChosenOrder = (e) => {
    setChosenOrder(e.target.value);
  };
  useEffect(() => {
    let OrderUser = localStorage.getItem("user");
    if (OrderUser) {
      setOrderUser(OrderUser);
      console.log("OrderUserID", OrderUser);
    }
  }, []);

  const handleGetAllOrders = async () => {
    await fetch("http://localhost:8000/order/getAllOrders", {
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
        console.log("getAllOrders", data);
        const selectOptions = data.orders.map(
          ({ name, address, _id, distance, restaurant, orderMentions }) => ({
            // id: index + 1,
            name: name,
            address: address,
            orderMentions: orderMentions,
            id: _id,
            distance: distance,
            restaurant: restaurant,
          })
        );
        console.log("selectOptions", selectOptions);
        console.log("res or", restaurantOrder);
        setTableData(selectOptions);
        //setId(data.data[0]._id);
      });
  };

  useEffect(() => {
    console.log("table data name", tableData);
  }, [tableData]);

  useEffect(() => {
    handleGetAllOrders();
  }, []);

  return (
    <form>
      <div className="space">
        <h1>Welcome, you can view all Orders!</h1>
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
                  Order
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  defaultValue=""
                  value={chosenOrder}
                  label="Flat"
                  onChange={handleChosenOrder}
                  renderValue={renderSelectedOrder}
                >
                  {tableData.map((Order) => (
                    <MenuItem key={Order.orderId} value={Order.orderId}>
                      {Order.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select the order</FormHelperText>
              </FormControl>

              {/* <Button
                style={btnStyle}
                type="submit"
                variant="contained"
                onClick={handleCreateOrder}
              >
                New Order
              </Button> */}
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
