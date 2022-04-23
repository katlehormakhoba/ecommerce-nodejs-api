const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authV = require('../controller_validation/authValidator');
const validator = require('validator');


exports.updateUser = catchAsync( async(req,res,next)=>{

    
})