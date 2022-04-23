const router = require('express').Router()
const authController = require('../controllers/authController')
const cartController = require('../controllers/cartController')


router.use(authController.checkUser)
router.use(cartController.setUserId)
router.route('/').get(cartController.getAllCarts).post(cartController.createCart)
router.route('/:id').patch(cartController.updateCart).delete(cartController.deleteCart)

module.exports = router;