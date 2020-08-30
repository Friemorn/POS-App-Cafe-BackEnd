const categoryModels = require('../models/category')
const helper = require('../helpers/helpers')
const redis = require('redis')
const client = redis.createClient(process.env.PORT_REDIS)

const category = {
  getCategoryById: (req, res) => {
    const id = req.params.id
    categoryModels.getCategoryById(id)
      .then((result) => {
        if (result.length > 0) {
          helper.res(res, result, 200, null)
        } else {
          helper.res(res, 'Category Not Found', 200, null)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getAllCategory: (req, res) => {
    categoryModels.getAllCategory()
      .then((result) => {
        if (result.length > 0) {
          client.setex('category', 60 * 60 * 12, JSON.stringify(result))
          helper.res(res, result, 200, null)
        } else {
          helper.res(res, 'Category Not Found', 200, null)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  updateCategory: (req, res) => {
    const id = req.params.id
    const {
      name
    } = req.body
    const data = {
      name
    }
    categoryModels.updateCategory(id, data)
      .then((result) => {
        console.log(result)
        helper.res(res, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  deleteCategory: (req, res) => {
    const id = req.params.id
    categoryModels.deleteCategory(id)
      .then((result) => {
        helper.res(res, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  insertCategory: (req, res) => {
    const {
      name
    } = req.body
    const data = {
      name
    }
    categoryModels.insertCategory(data)
      .then((result) => {
        console.log(result)
        helper.res(res, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = category
