const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authV = require("../controller_validation/authValidator");
const validator = require("validator");

exports.updateUser = catchAsync(async (req, res, next) => {
  password = req.body.password;
  conPassword = req.body.conPassword;

  if (password != conPassword) next(new Error("Password does not match"));

  const user = await User.update(req.body, {
    where: { id: req.user.id },
  });

  if (!user[0]) return next(new Error("Document does not exist"));

  res.status(200).json({
    status: "success",
    message: "User updated",
    user,
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const me = await User.findOne({
    where: { id: req.user.id },
    attributes: { exclude: ["updatedAt", "createdAt", "password"] },
  });

  res.status(200).json({
    status: "success",
    message: "My data",
    me,
  });
});

exports.setVender = catchAsync(async (req, res, next) => {
  const user = await User.findOne({
    where: { id: req.user.id },
    attributes: { exclude: ["updatedAt", "createdAt", "id"] },
  });

  user.email = user.email.split("@")[0] + "@kasiapp.com";
  user.isActive = false;
  user.userType = "vendor";
  req.vendor = user;

  next();
});
exports.requestVendorStatus = catchAsync(async (req, res, next) => {
  password = req.body.password;
  conPassword = req.body.conPassword;

  if (password != conPassword) next(new Error("Password does not match"));

  req.vendor.dataValues.password = req.body.password;
  const me = await User.create(req.vendor.dataValues);

  res.status(200).json({
    status: "success",
    message: "Vendor request",
    me,
  });
});
