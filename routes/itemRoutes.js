const router = require('express').Router()
const authController = require('../controllers/authController')
const itemController = require('../controllers/itemController')


router.route('/states').get(itemController.getStates)

router.route('/myItems').get(authController.checkUser,itemController.getAllVendorItems).post(authController.checkUser,itemController.createItem)

router.route('/').get(itemController.getAllItems).post(authController.checkUser,itemController.createItem)
router.route('/:id').get(itemController.getItem).delete(itemController.deleteItem).patch(itemController.updateItem)




module.exports = router;