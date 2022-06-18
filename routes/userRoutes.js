const router = require('express').Router()
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')



router.route('/signup').post(authController.signUp)
router.route('/login').post(authController.login)


router.use(authController.checkUser)

router.route('/me').get(userController.getMe)

router.route('/vendors').get(userController.getVendorRequest)
router.route('/users').get(userController.getAllUsers)
router.route('/getAllvendors').get(userController.getAllVendor)

router.route('/deleteUser/:id').delete(userController.deleteUserAccount)
router.route('/deleteVendor/:id').delete(userController.deleteVendor)



router.route('/acceptVendor/:id').patch(userController.acceptVendorShip)
router.route('/de-activate').patch(userController.deactivateAccount)
router.route('/request').post(userController.setVender,userController.requestVendorStatus)
router.route('/').patch(userController.updateUser)




module.exports = router;