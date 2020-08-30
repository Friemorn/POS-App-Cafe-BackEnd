const redis = require('redis')
const client = redis.createClient(process.env.PORT_REDIS)
const helper = require('../helpers/helpers')

module.exports = {
  cacheGetAllBook: (req, res, next) => {
    client.get('category', (err, data) => {
      if (err) throw err
      if (data !== null) {
        helper.res(res, JSON.parse(data), 200)
      } else {
        next()
      }
    })
  },
  clearGetAllbooks: (req, res, next) => {
    client.del('category')
    next()
  }
}
