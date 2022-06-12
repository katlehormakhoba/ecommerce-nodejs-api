const stripe = require('stripe')(`sk_test_51L9xZ0AJ7djmLPom3HMCUAb2jDs16PbegNigaRl92qBstwHDvoLov0iBrdv3ytqgRUSLlZUtpEpGZ38mZDloANh000j8P9OCR3`);
const Product = require('../models/itemModel');
const catchAsync = require('../utils/catchAsync');
const Order = require('../models/orderModel');
const Address = require('../models/addressModel');
const Cart = require('../models/cartModel');

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

exports.createPayment = catchAsync(async(req, res, next) => {




    let obj = {};
    let loop = 0;
    let ids = [];
    let orderID = `${req.user.id}-${Date.now()}`;
    const items = await Cart.findAll({
        where: {
            userId: req.user.id
        }
    }); //TO GET MY PRODUCTS IDS FROM CART

    //SETTING MY PRODUCTS IDS FROM CART
   console.log("hello:: ", items)
    // //SETTING ORDER ID
    // obj.orderID = orderID;
    // req.body.orderID = orderID;
    // //SETTING PRODUCT IDS
    // obj.product = ids;
    // req.body.product = ids;
    // //SETTING USER IDS
    // obj.user = req.user.id;    
    

    // await Address.create(req.body);
    // await Order.create(obj);

    next();
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
        success_url: `https://cottonfest.herokuapp.com/order`,
        cancel_url: `https://cottonfest.herokuapp.com/cart`,
        customer_email: req.user.email,
        client_reference_id: req.params.id,
        line_items: [{
            name: 'Kasi_Supplier ',
            description: 'Your One Stop Supplier...',
            images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZnuED3kdYDZakSHic0FNgSlmGFPWved9DLw&usqp=CAU'],
            amount: (Math.round(req.params.amount* 0.065)) * 100 ,
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

    

    await Order.bulkCreate(items);

    await Cart.destroy({
        where: {
            userId : req.user.id
        }
    });



    //3) response
    res.status(200).json({
        status: 'success',
         session,
         items
    })
})


exports.getAllCheckoutSession = catchAsync(async( req, res, next) => {

    
    

    //2) Creating checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `https://cottonfest.herokuapp.com/order`,
        cancel_url: `https://cottonfest.herokuapp.com/cart`,
        customer_email: req.user.email,
        line_items: [{
            name: 'Kasi_Supplier ',
            description: 'Your One Stop Supplier...',
            images: [`${req.protocol}://${req.get('host')}/img/purchase/cart.jpg`],
            amount: (Math.round(req.amount * 0.065)) * 100 ,
            currency: 'usd',
            quantity: 1
        }]
    })

    await Cart.deleteMany({user: req.user._id});

    // 3) response

    res.status(200).json({
        status: 'success',
        session
    })
})