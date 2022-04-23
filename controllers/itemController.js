const Item = require("../models/itemModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllItems = catchAsync(async (req, res, next) => {

  const items = await Item.findAll({});
  
  res.status(200).json({
    status: "success",
    items,
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

