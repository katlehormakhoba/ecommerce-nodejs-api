const Cart = require("../models/cartModel");
const catchAsync  = require('../utils/catchAsync')
const User = require('../models/userModel')
const Iterm = require('../models/itemModel')
const Wish = require("../models/wishModel")


exports.setUserId = (req, res, next) => {

    //SETTING BODY 
    req.body.userId = req.user.id
    next()
}

exports.createWish = catchAsync(async(req,res,next)=> {

    const wish =  await Wish.create(req.body);
    
    res.status(200).json({
        status: "success",
        message: "Added to cart",
        wish
    })
})
//ADMIN

exports.getAllWishes = async(req,res,next)=> {

    const wishes = await Wish.findAll({
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
        message: "Hello from get all Wish route 😜",
        results: wishes.length,
        wishes
    })
}

exports.getWish = async(req, res, next) =>{
    
    const wish = await Wish.findOne({
        where: {id : req.params.id}
    })

    if(!wish) return next(new Error('Document does not exist'));

    res.status(200).json({
        status: "success",
        wish
    })
}

exports.updateWish = async(req, res, next) =>{
    const {body} = req;
    
    const wish = await Wish.update(body,
        {
        where: {id : req.params.id}
    })

    if(!wish[0]) return next(new Error('Document does not exist'));

    res.status(200).json({
        status: "success",
        message: "wish updated",
        wish
    })
}


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