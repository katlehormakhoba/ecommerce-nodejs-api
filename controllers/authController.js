const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authV = require('../controller_validation/authValidator');
const validator = require('validator')

const signToken = (user) => {

  
    return jwt.sign(
      {
        name: user.name,
        id: user.id,
        userType: user.userType,
        email: user.email,
        photo: user.photo,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  };

exports.signUp = catchAsync(async (req, res, next) => {


  const {error, value} = authV.regValidation(req.body)

  if(error) return next( new Error(error.details[0].message))
  

  const user = await User.create(value);

  res.status(200).json({
    status: "success",
    message: "Register successfull",
    error
  });
});


exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new Error("Please provide email and password"));

  if (typeof email === "object")
    return next(new Error("Invalid email address"));

  const user = await User.findOne({ where: { email: req.body.email } });

  // const match  = await bcrypt.compare(password, user.password);

  if (!user || !(await bcrypt.compare(password, user.password)))
    return next(new Error("Incorrect email or password"));

  if (user.isActive == false)
    return next(new Error("Account deactivated!!"));

  const token = signToken(user);

  const cookieOptions = res.cookie("jwt", token, {
    expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    httpOnly: true,
  });

  cookieOptions.secure = true;

  res.status(200).json({
    status: "success",
    message: "Successfully logged in",
    token,
  });
});



exports.checkUser = (req, res, next) => {
    //Your code goes here.......
  
    const token = req.headers.authorization;
  
    if (!token) return next(new Error("Ooops Please log in"));
  
    decodedToken = jwt.verify(token.split(" ")[1],process.env.JWT_SECRET);
  
    const user = decodedToken;
  
    req.user = user;
  
    next();
  };

  exports.restrictTo = (...roles) => {

    return (req, res, next) => {
        const { userType } = req.user;

        if (roles.includes(userType)) {
            return next(new Error('Sorry you dont have permission to perform this action'))
        }

        next();
    }
}