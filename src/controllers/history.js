const historyModels = require('../models/history')
const helper = require('../helpers/helpers')

const history = {
  getHistoryById: (req, res) => {
    const id = req.params.id
    historyModels.getHistoryById(id)
      .then((result) => {
        if (result.length > 0) {
          helper.res(res, result, 200, null)
        } else {
          helper.res(res, 'History Not Found', 200, null)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getAllHistory: (req, res) => {
    historyModels.getAllHistory()
      .then((result) => {
        if (result.length > 0) {
          helper.res(res, result, 200, null)
        } else {
          helper.res(res, 'History Not Found', 200, null)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  updateHistory: (req, res) => {
    const id = req.params.id
    const {
      invoices,
      cashier,
      cashierName,
      orders,
      amount
    } = req.body
    const data = {
      invoices,
      cashier,
      cashierName,
      orders,
      amount,
      date: new Date()
    }
    historyModels.updateHistory(id, data)
      .then((result) => {
        console.log(result)
        helper.res(res, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  deleteHistory: (req, res) => {
    const id = req.params.id
    historyModels.deleteHistory(id)
      .then((result) => {
        helper.res(res, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  insertHistory: (req, res) => {
    const {
      invoices,
      cashier,
      cashierName,
      orders,
      amount
    } = req.body
    const data = {
      invoices,
      cashier,
      cashierName,
      orders,
      amount,
      date: new Date()
    }
    historyModels.insertHistory(data)
      .then((result) => {
        console.log(result)
        helper.res(res, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = history
