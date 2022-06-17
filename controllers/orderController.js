const Order = require("../models/orderModel");
const catchAsync  = require('../utils/catchAsync')
const User = require('../models/userModel')
const Item = require('../models/itemModel')
const sequelize = require('../config/db')


exports.setUserId = (req, res, next) => {

    //SETTING BODY 
    req.body.userId = req.user.id
    next()
}

exports.createOrder = catchAsync(async(req,res,next)=> { // Come here when order is successfull

    const order =  await Order.create(req.body);
    
    res.status(200).json({
        status: "success",
        message: "Added to orders",
        order
    })
})
//ADMIN

exports.getAllOrders = async(req,res,next)=> {


    const orders = await Order.findAll({
        where: { userId: req.user.id },
        group: "orderNum",
        include: [

            {
              model: Item,
              attributes: { exclude: ["updatedAt", "createdAt"] },
              
            }
          ],
        });
        
        const items = await Order.findAll({
            where: { userId: req.user.id },
            include: [

                {
                  model: Item,
                  attributes: { exclude: ["updatedAt", "createdAt"] },
                  
                }
              ]
        })



    res.status(200).json({
        status: "success",
        message: "Hello from get all orders route 😜",
        results: orders.length,
        orders,
        items
    })
}


exports.getOrderDetails = async(req,res,next)=> {

    const orders = await Order.findAll({
        where: { orderNum: req.params.id },
        include: [

            {
              model: Item,
              attributes: { exclude: ["updatedAt", "createdAt"] },
            }
          ],
        });


    res.status(200).json({
        status: "success",
        message: "Hello from get all orders route 😜",
        results: orders.length,
        orders
    })
}

exports.getOrder = async(req, res, next) =>{
    
    const order = await Order.findOne({
        where: {id : req.params.id}
    })

    if(!order) return next(new Error('Document does not exist'));

    res.status(200).json({
        status: "success",
        order
    })
}

exports.updateOrder = async(req, res, next) =>{
    const {body} = req;
    
    const order = await Order.update(body,
        {
        where: {id : req.params.id}
    })

    if(!order[0]) return next(new Error('Document does not exist'));

    res.status(200).json({
        status: "success",
        message: "Order updated",
        order
    })
}


exports.deleteOrder = async(req, res, next) =>{

    
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