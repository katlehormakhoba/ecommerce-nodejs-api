const router = require('express').Router();
const paymentController = require('../controllers/paymentController');
const authController = require('../controllers/authController');

router.use(authController.checkUser);

router.route('/states').get(paymentController.getPaymentStates)



router.route('/:amount')
    .post(paymentController.getAddress,paymentController.getCheckoutSession);


module.exports = router;