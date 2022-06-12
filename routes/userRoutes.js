const router = require('express').Router()
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')



router.route('/signup').post(authController.signUp)
router.route('/login').post(authController.login)


router.use(authController.checkUser)

router.route('/me').get(userController.getMe)
router.route('/request').post(userController.setVender,userController.requestVendorStatus)
router.route('/').patch(userController.updateUser)




module.exports = router;