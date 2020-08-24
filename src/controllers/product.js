const productModels = require('../models/product')
const helper = require('../helpers/helpers')
const redis = require('redis')
const client = redis.createClient(process.env.PORT_REDIS)

const product = {
  getProductById: (req, res) => {
    const id = req.params.id
    productModels.getProductById(id)
      .then((result) => {
        if (result.length > 0) {
          helper.res(res, result, 200, null)
        } else {
          helper.res(res, 'Product Not Found', 200, null)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getAllProduct: (req, res) => {
    const search = req.query.search
    const sort = req.query.sort
    const limit = parseInt(req.query.limit)
    const page = parseInt(req.query.page)
    const offset = (page - 1) * limit
    const end = page * limit

    let countData
    let countSearch
    let next
    let previous
    let resultPage
    let endPage
    let endPageSearch

    productModels.getCount().then(result => {
      countData = result[0].count
      endPage = Math.ceil(countData / limit)
    })
    productModels.getSearchCount(search).then(result => {
      countSearch = result[0].searchCount
      endPageSearch = Math.ceil(countSearch / limit)
    })

    if (search) {
      productModels.searchProduct(search, limit, offset)
        .then((result) => {
          if (end < countSearch) {
            next = {
              'next page': page + 1,
              'next url': `http://localhost:4000/api/v1/product?search=${search}&page=${page + 1}&limit=${limit}`
            }
          }

          if (offset > 0) {
            previous = {
              'previous page': page - 1,
              'previous url': `http://localhost:4000/api/v1/product?search=${search}&page=${page - 1}&limit=${limit}`
            }
          }

          resultPage = {
            'current page': page,
            'per page': limit,
            'total data': countSearch,
            ...next,
            ...previous,
            'first page': 1,
            'last page': endPageSearch
          }

          if (result.length > 0) {
            helper.response(res, resultPage, result, 200, null)
          } else {
            helper.response(res, resultPage, 'Product Not Found', 200, null)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (sort) {
      productModels.sortProduct(sort, limit, offset)
        .then((result) => {
          if (end < countData) {
            next = {
              'next page': page + 1,
              'next url': `http://localhost:4000/api/v1/product?sort=${sort}&page=${page + 1}&limit=${limit}`
            }
          }

          if (offset > 0) {
            previous = {
              'previous page': page - 1,
              'previous url': `http://localhost:4000/api/v1/product?sort=${sort}&page=${page - 1}&limit=${limit}`
            }
          }

          resultPage = {
            'current page': page,
            'per page': limit,
            'total data': countData,
            ...next,
            ...previous,
            'first page': 1,
            'last page': endPage
          }

          if (result.length > 0) {
            helper.response(res, resultPage, result, 200, null)
          } else {
            helper.response(res, resultPage, 'Product Not Found', 200, null)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      productModels.getAllProduct(limit, offset)
        .then((result) => {
          if (end < countData) {
            next = {
              'next page': page + 1,
              'next url': `http://localhost:4000/api/v1/product?page=${page + 1}&limit=${limit}`
            }
          }

          if (offset > 0) {
            previous = {
              'previous page': page - 1,
              'previous url': `http://localhost:4000/api/v1/product?page=${page - 1}&limit=${limit}`
            }
          }

          resultPage = {
            'current page': page,
            'per page': limit,
            'total data': countData,
            ...next,
            ...previous,
            'first page': 1,
            'last page': endPage
          }

          if (result.length > 0) {
            client.setex('getAllProduct', 60*60*12 , JSON.stringify(result))
            helper.response(res, resultPage, result, 200, null)
          } else {
            helper.response(res, resultPage, 'Product Not Found', 200, null)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  updateProduct: (req, res) => {
    if (req.roleId == '1') {
      const id = req.params.id
      const {
        name,
        image,
        price,
        idCategory
      } = req.body
      const data = {
        name,
        image,
        price,
        idCategory,
        updatedAt: new Date()
      }
      productModels.updateProduct(id, data)
        .then((result) => {
          console.log(result)
          helper.res(res, result, 200, null)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      helper.res(res, 'Update Product is Not Allowed', 200, null)
    }
  },
  deleteProduct: (req, res) => {
    if (req.roleId == '1') {
      const id = req.params.id
      productModels.deleteProduct(id)
        .then((result) => {
          helper.res(res, result, 200, null)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      helper.res(res, 'Delete Product is Not Allowed', 200, null)
    }
  },
  insertProduct: (req, res) => {
    if (req.roleId == '1') {
      const {
        name,
        price,
        idCategory
      } = req.body
      const data = {
        name,
        image: `http://localhost:4000/api/v1/uploads/${req.file.filename}`,
        price,
        idCategory,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      productModels.insertProduct(data)
        .then((result) => {
          console.log(result)
          helper.res(res, result, 200, null)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      helper.res(res, 'Insert Product is Not Allowed', 200, null)
    }
  }
}

module.exports = product
