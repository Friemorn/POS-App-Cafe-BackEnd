const express = require('express')
const productController = require('../controllers/product')
const router = express.Router()

router
  .get('/:id', productController.getProductById)
  .get('/', productController.getAllProduct)
  .post('/', productController.insertProduct)
  .patch('/:id', productController.updateProduct)
  .delete('/:id', productController.deleteProduct)

module.exports = router
