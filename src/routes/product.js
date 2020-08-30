const express = require('express')
const productController = require('../controllers/product')
const router = express.Router()
const { verifyAccess } = require('../middlewares/auth')
const { upload } = require('../middlewares/multer')
const redis = require('../middlewares/redis')

router
  .get('/:id', verifyAccess, productController.getProductById)
  .get('/', verifyAccess, redis.cacheGetAllBook, productController.getAllProduct)
  .post('/', verifyAccess, redis.clearGetAllbooks, upload, productController.insertProduct)
  .patch('/:id', verifyAccess, upload, productController.updateProduct)
  .delete('/:id', verifyAccess, productController.deleteProduct)

module.exports = router
