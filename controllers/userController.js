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

exports.deleteVendor = async(req, res, next) =>{

    
  const vendor = await User.destroy(
      {
      where: {id : req.params.id}
  })

  console.log(vendor)
  if(!vendor) return next(new Error('Document does not exist'))
  res.status(200).json({
      status: "success",
      message: "vendor deleted",
      vendor
  })
}

exports.getVendorRequest = catchAsync(async (req, res, next) => {
  
  const vendors = await User.findAll({
    where: { userType: 'vendor', isActive: false },
    attributes: { exclude: ["updatedAt", "createdAt", "password"] },
  });

  res.status(200).json({
    status: "success",
    message: "My data",
    vendors
  });
});

exports.getAllVendor = catchAsync(async (req, res, next) => {
  
  const vendors = await User.findAll({
    where: { userType: 'vendor', isActive: true},
    attributes: { exclude: ["updatedAt", "createdAt", "password"] },
  });

  res.status(200).json({
    status: "success",
    message: "My data",
    vendors
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  
  const users = await User.findAll({
    where: { userType: 'user'},
    attributes: { exclude: ["updatedAt", "createdAt", "password"] },
  });

  res.status(200).json({
    status: "success",
    message: "My data",
    users
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

exports.acceptVendorShip = catchAsync(async(req, res, next) =>{

  const user = await User.findOne({
    where: {id : req.params.id}
})

  if(!user) return next(new Error('Document does not exist'));

  user.isActive = true;
  await user.save();

  res.status(200).json({
      status: "success",
    message: "Vendor Accepted",
    user
  })
})


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


exports.deactivateAccount = catchAsync(async(req,res,next)=> { // Come here when order is successfull

  const user =  await User.update({isActive: false}, {
    where: { id: req.user.id },
  });
  
  res.status(200).json({
      status: "success",
      message: "Added to users",
      user
  })
})

exports.deleteUserAccount = async(req, res, next) =>{

    
   
  const user = await User.destroy(
      {
      where: {id : req.params.id}
  })

  console.log(user)
  if(!user) return next(new Error('Document does not exist'))


  res.status(200).json({
      status: "success",
      message: "user deleted",
      user
  })
}
