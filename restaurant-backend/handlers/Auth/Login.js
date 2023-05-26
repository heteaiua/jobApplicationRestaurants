const express = require("express");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/UsersModel");
const dotenv = require("dotenv");
dotenv.config();

// //login
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ email });
    //compare paswword with hashedpassword
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            email: user.email,
            password: user.password,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "60m" }
      );
      return res.status(200).json({ accessToken: accessToken, user: user });
    } else {
      return res
        .status(400)
        .json({ message: JSON.stringify("Password and email is not valid") });
    }
  } catch (err) {
    return res.json({ err: err });
  }
};

module.exports = login;
