const connection = require('../configs/db')

const product = {
  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT product.*,category.name AS categoryName FROM product LEFT JOIN category ON product.idCategory = category.idCategory WHERE product.id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getAllProduct: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT product.*,category.name AS categoryName FROM product LEFT JOIN category ON product.idCategory = category.idCategory LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  searchProduct: (name, limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT product.*,category.name AS categoryName FROM product LEFT JOIN category ON product.idCategory = category.idCategory WHERE product.name LIKE ? LIMIT ${limit} OFFSET ${offset}`, `%${name}%`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  sortProduct: (sort, limit, offset) => {
    return new Promise((resolve, reject) => {
      let sortBy
      if (sort === 'created_at') {
        sortBy = 'DESC'
      } else {
        sortBy = 'ASC'
      }
      connection.query(`SELECT product.*, category.name AS categoryName FROM product INNER JOIN category ON product.idCategory = category.idCategory ORDER BY ?? ${sortBy} LIMIT ${limit} OFFSET ${offset}`, sort, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateProduct: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE product SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  deleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM product WHERE id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  insertProduct: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO product SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getSearchCount: (name) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT COUNT(*) AS searchCount FROM product WHERE name LIKE ?', `%${name}%`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getCount: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT COUNT(*) AS count FROM product', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}

module.exports = product
