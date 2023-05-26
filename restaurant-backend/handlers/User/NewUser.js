const express = require("express");
const User = require("../../models/UsersModel");
const createUser = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  let createdUser;
  try {
    const users = await User.find().exec();
    const usedEmail = users.find((p) => p.email === email);

    if (usedEmail)
      return res.json({
        message: "Email already used!",
      });

    createdUser = new User({
      firstName,
      lastName,
      email,
      password,
    });
    await createdUser.save();
  } catch (err) {
    res.status(500).json("Registration has failed!");
  }
  res.json({
    message: "New user added!",
    user: createdUser,
  });
};

module.exports = createUser;
