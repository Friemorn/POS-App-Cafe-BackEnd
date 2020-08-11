const express = require('express')
const categoryController = require('../controllers/category')
const router = express.Router()

router
  .get('/:id', categoryController.getCategoryById)
  .get('/', categoryController.getAllCategory)
  .post('/', categoryController.insertCategory)
  .patch('/:id', categoryController.updateCategory)
  .delete('/:id', categoryController.deleteCategory)

module.exports = router
