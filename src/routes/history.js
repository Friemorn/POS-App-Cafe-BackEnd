const express = require('express')
const historyController = require('../controllers/history')
const router = express.Router()

router
  .get('/:id', historyController.getHistoryById)
  .get('/', historyController.getAllHistory)
  .post('/', historyController.insertHistory)
  .patch('/:id', historyController.updateHistory)
  .delete('/:id', historyController.deleteHistory)

module.exports = router
