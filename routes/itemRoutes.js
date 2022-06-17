const router = require('express').Router()
const authController = require('../controllers/authController')
const itemController = require('../controllers/itemController')


router.route('/states').get(itemController.getStates)


router.route('/').get(itemController.getAllItems).post(authController.checkUser, authController.restrictTo('ve'),itemController.createItem)
router.route('/:id').get(itemController.getItem).post(itemController.deleteItem).patch(itemController.updateItem)




module.exports = router;