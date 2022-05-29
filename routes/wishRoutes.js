const router = require('express').Router()
const authController = require('../controllers/authController')
const wishController = require('../controllers/wishController')


router.use(authController.checkUser)
router.use(wishController.setUserId)

router.route('/moveToCart/:id').post(wishController.moveToCart)

router.route('/').get(wishController.getAllWishes).post(wishController.createWish)
router.route('/:id').patch(wishController.updateWish).delete(wishController.deleteWish)

module.exports = router;