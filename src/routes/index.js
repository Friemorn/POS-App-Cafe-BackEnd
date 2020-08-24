const express = require('express')
const productRoutes = require('./product')
const categoryRoutes = require('./category')
const historyRoutes = require('./history')
const userRoutes = require('./user')

const router = express.Router()

router
  .use('/product', productRoutes)
  .use('/category', categoryRoutes)
  .use('/history', historyRoutes)
  .use('/user', userRoutes)

module.exports = router
