const stripe = require('stripe')(`sk_test_51L9xZ0AJ7djmLPom3HMCUAb2jDs16PbegNigaRl92qBstwHDvoLov0iBrdv3ytqgRUSLlZUtpEpGZ38mZDloANh000j8P9OCR3`);
const Product = require('../models/itemModel');
const catchAsync = require('../utils/catchAsync');
const Order = require('../models/orderModel');
const Address = require('../models/addressModel');
const Cart = require('../models/cartModel');
const sequelize = require('../config/db')

exports.setProductUserIds = (req, res, next) => {

    //FOR CREATING USER ORDERS BY SETTING PRODUCT ID USING FACTORY HANDLER
    // if (!req.body.product) {
    //     req.body.product = req.params.id;
    // }

    //FOR CREATING USER ORDERS BY SETTING USER ID USING FACTORY HANDLER
    if (!req.body.user) {
        req.body.user = req.user.id;
    }

    //FOR GETTING USER ORDERS USING FACTORY HANDLER
    if (!req.params.userId) {
        req.params.userId = req.user.id;
    }

    next();
}


exports.getAddress =  catchAsync(async( req, res, next) => {
    let data = {
        street: "Soshanguve - K",
        town: "Soshanguve",
        zipCode: "0152",
        province: "Gauteng",
        city: "Pretoria",
        userId: req.user.id
    }
    let address;

    if(req.body.deliveryType != 1){
         address = await Address.findOne({
            where: {userId : req.user.id, isActive : true}
        })

    }
    else{
        address = await Address.create(data)
    }
    

    req.address = address;
    next()
})


const getCartStats = async(req, res, next) => {

    const cart = await Cart.findAll({user: req.user.id});
    let amount = 0;
    let loop = 0;

    cart.forEach( _ => {
        amount += cart[loop].product.price;
        loop++;
    });
    return amount;

}



exports.getCheckoutSession = catchAsync(async( req, res, next) => {

    //2) Creating checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `http://localhost:4200/success`,
        cancel_url: `http://localhost:4200/home/cart`,
        customer_email: req.user.email,
        client_reference_id: req.params.amount,
        line_items: [{
            name: 'Kasi_Supplier ',
            description: 'Your One Stop Supplier...',
            images: ['https://www.pngall.com/wp-content/uploads/2016/06/Ecommerce-PNG-Pic.png'],
            amount: (req.params.amount * 100),
            currency: 'zar',
            quantity: 1
        }]
    })

    const items = await Cart.findAll({
        where: {
            userId: req.user.id
        }
        ,    attributes: { exclude: ["updatedAt", "createdAt", "id"] },

    })

    
// console.log('ITEMS: ',items)
let loop = 0;
let obj = []
items.forEach( _ => {
    console.log('ITEMS: ',items[loop].dataValues)
    // amount += cart[loop].product.price;
    items[loop].dataValues.orderNum = req.body.orderNum
    items[loop].dataValues.addressId = req.address.id
    obj.push(items[loop].dataValues)
    loop++;
});

    await Order.bulkCreate(obj);

    await Cart.destroy({
        where: {
            userId : req.user.id
        }
    });

    


    //3) response
    res.status(200).json({
        status: 'success',
         session,
        //  items
    })
})


exports.sessionSuccessfull = catchAsync(async( req, res, next) => {

    await Cart.destroy({
        where: {
            userId : req.user.id
        }
    });
})


exports.getPaymentStates = async(req, res, next) =>{
    
    const cart = await  sequelize.query({
        where: {id : req.params.id}
    })

    if(!cart) return next(new Error('Document does not exist'));

    res.status(200).json({
        status: "success",
        cart
    })
}