const Address = require("../models/addressModel");
const catchAsync  = require('../utils/catchAsync')
const User = require('../models/userModel')
const Iterm = require('../models/itemModel')
const Wish = require("../models/wishModel")


exports.setUserId = (req, res, next) => {

    //SETTING BODY 
    req.body.userId = req.user.id
    next()
}

exports.createAddress = catchAsync(async(req,res,next)=> {

    const address =  await Address.create(req.body);
    
    res.status(200).json({
        status: "success",
        message: "Added to address",
        address
    })
})
//ADMIN

exports.getAllAddress = async(req,res,next)=> {

    const addresses = await Address.findAll({
        where: { userId: req.user.id },

        });


    res.status(200).json({
        status: "success",
        message: "Hello from get all address route 😜",
        results: addresses.length,
        addresses
    })
}

exports.getAddress = async(req, res, next) =>{
    
    const address = await Address.findOne({
        where: {userId : req.user.id, isActive : true}
    })

    if(!address) return next(new Error('Document does not exist'));

    res.status(200).json({
        status: "success",
        address
    })
}

exports.updateAddress = async(req, res, next) =>{
    const {body} = req;
    
    const address = await Address.update(body,
        {
        where: {id : req.params.id}
    })

    if(!wish[0]) return next(new Error('Document does not exist'));

    res.status(200).json({
        status: "success",
        message: "wish updated",
        address
    })
}














//  NOT IMPORTANT
exports.deleteWish = async(req, res, next) =>{

    
   
    const wish = await Wish.destroy(
        {
        where: {id : req.params.id}
    })

    console.log(wish)
    if(!wish) return next(new Error('Document does not exist'))


    res.status(200).json({
        status: "success",
        message: "wish deleted",
        wish
    })
}

exports.moveToCart = async(req, res, next) =>{

   
    const wish = await Wish.destroy(
        {
        where: {id : req.body.id}
    })
    console.log(wish)
    if(!wish) return next(new Error('Document does not exist'))

    req.body.itemId = req.body.item.id
    const cart =  await Cart.create(req.body);
    
    
    res.status(200).json({
        status: "success",
        message: "Added to cart",
        cart
    })
}