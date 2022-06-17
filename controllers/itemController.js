const Item = require("../models/itemModel");
const catchAsync = require("../utils/catchAsync");
const sequelize = require('../config/db')

exports.getAllItems = catchAsync(async (req, res, next) => {

  const items = await Item.findAll({});
  
  res.status(200).json({
    status: "success",
    items,
  });
});

exports.getAllVendorItems = catchAsync(async (req, res, next) => {

  const items = await Item.findAll({
    where: {vendorId : req.user.id}
  });
  
  res.status(200).json({
    status: "success",
    items,
  });
});

exports.getItem = catchAsync(async (req, res, next) => {

  const item = await Item.findOne({
    where: {id : req.params.id}
})
  
  res.status(200).json({
    status: "success",
    item,
  });
});

exports.createItem = catchAsync(async (req, res, next) => {
  const item = await Item.create(req.body);
  res.status(200).json({
    status: "success",
    item,
  });
});

exports.updateItem = catchAsync(async (req, res, next) => {
  const item = await Item.update({
    where: {
      id: req.params.id
    }
  });
  res.status(200).json({
    status: "success",
    item,
  });
});

exports.deleteItem = catchAsync(async (req, res, next) => {
  const item = await Item.destroy({
    where: {
      id: req.params.id
    }
  });
  res.status(200).json({
    status: "success",
    item,
  });
});


exports.getStates = catchAsync(async(req,res,next)=> {

  const states =  await sequelize.query(`select count(*) from items where userId = 91  GROUP BY name`)
  
  res.status(200).json({
      status: "success",
      message: "states",
      states
  })
})
