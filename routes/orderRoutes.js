const router = require('express').Router();
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

router.use(authController.checkUser);



router.route('/')
    .get(orderController.getAllOrders);

router.route('/:id')
    .post(orderController.getOrderDetails);


module.exports = router;