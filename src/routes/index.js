const express = require('express')
const productRoutes = require('./product')
const categoryRoutes = require('./category')
const historyRoutes = require('./history')

const router = express.Router()

router
  .use('/product', productRoutes)
  .use('/category', categoryRoutes)
  .use('/history', historyRoutes)

module.exports = router
