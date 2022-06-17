const router = require('express').Router()
const authController = require('../controllers/authController')
const addressController = require('../controllers/addressController')


// router.route('/states').get(itemController.getStates)

router.use(authController.checkUser)
router.use(addressController.setUserId)
router.route('/').post(addressController.createAddress).get(addressController.getAddress)
router.route('/:id').get(addressController.getAddress);




module.exports = router;