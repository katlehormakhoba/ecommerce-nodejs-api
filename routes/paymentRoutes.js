const router = require('express').Router();
const paymentController = require('../controllers/paymentController');
const authController = require('../controllers/authController');

router.use(authController.checkUser);

router.route('/')
    .post(paymentController.setProductUserIds, 
        paymentController.createPayment, 
        paymentController.getAllCheckoutSession);

router.route('/:amount')
    .get(paymentController.getCheckoutSession);


module.exports = router;