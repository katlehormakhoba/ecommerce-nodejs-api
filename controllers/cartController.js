const Cart = require("../models/cartModel");
const catchAsync  = require('../utils/catchAsync')
const User = require('../models/userModel')
const Iterm = require('../models/itemModel')


exports.setUserId = (req, res, next) => {

    //SETTING BODY 
    req.body.userId = req.user.id
    next()
}

exports.createCart = catchAsync(async(req,res,next)=> {

    const cart =  await Cart.create(req.body);
    
    res.status(200).json({
        status: "success",
        cart
    })
})
//ADMIN

exports.getAllCarts = async(req,res,next)=> {

    const carts = await Cart.findAll({
        where: { userId: req.user.id },
        include: [

            {
              model: Iterm,
              attributes: { exclude: ["updatedAt", "createdAt"] },
            }
          ],
        });


    res.status(200).json({
        status: "success",
        message: "Hello from get all Blogs route 😜",
        results: carts.length,
        carts
    })
}

exports.getCart = async(req, res, next) =>{
    
    const cart = await Cart.findOne({
        where: {id : req.params.id}
    })

    if(!cart) return next(new Error('Document does not exist'));

    res.status(200).json({
        status: "success",
        cart
    })
}

exports.updateCart = async(req, res, next) =>{
    const {body} = req;
    
    const cart = await Cart.update(body,
        {
        where: {id : req.params.id}
    })

    if(!cart[0]) return next(new Error('Document does not exist'));

    res.status(200).json({
        status: "success",
        message: "Cart updated",
        cart
    })
}


exports.deleteCart = async(req, res, next) =>{

    
    const cart = await Cart.destroy(
        {
        where: {id : req.params.id}
    })

    console.log(cart)
    if(!cart) return next(new Error('Document does not exist'))
    res.status(200).json({
        status: "success",
        message: "Cart deleted",
        cart
    })
}