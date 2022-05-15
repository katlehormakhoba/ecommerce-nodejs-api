const router = require('express').Router()
const authController = require('../controllers/authController')
const itemController = require('../controllers/itemController')



router.route('/').get(itemController.getAllItems).post(itemController.createItem)
router.route('/:id').get(itemController.getItem).post(itemController.deleteItem).patch(itemController.updateItem)


module.exports = router;