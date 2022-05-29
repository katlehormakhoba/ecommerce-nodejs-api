const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authV = require('../controller_validation/authValidator');
const validator = require('validator');


exports.updateUser = catchAsync( async(req,res,next)=>{

    
})

exports.getMe = catchAsync(async(req,res,next)=> {

    const me =  await User.findOne({
        where: { id: req.user.id },
        attributes: { exclude: ["updatedAt", "createdAt", "password"] }
    });
    
    res.status(200).json({
        status: "success",
        message: "My data",
        me
    })
})