const express = require("express");
const signup = require("../handlers/Auth/SignUp");
const login = require("../handlers/Auth/Login");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

const createUser = require("../handlers/User/NewUser");
const updateUser = require("../handlers/User/UpdateUser");
const getAllUsers = require("../handlers/User/GetAllUsers");
const deleteUser = require("../handlers/User/DeleteUser");
const getUserById = require("../handlers/User/GetUserById");

router.post("/signup", signup);
router.post("/login", login);

router.post("/", createUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getUserById/:userId", getUserById);
router.delete("/deleteUser/:userId", deleteUser);
router.patch("/updateUser/:userId", updateUser);

module.exports = router;
