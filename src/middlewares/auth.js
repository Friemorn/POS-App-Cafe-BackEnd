const jwt = require('jsonwebtoken')
const helper = require('../helpers/helpers')

module.exports = {
  verifyAccess: (req, res, next) => {
    let token = req.headers.authorization
    if (!req.headers.authorization) {
      return helper.res(res, { message: 'Token is Needed' }, 401)
    }
    token = token.split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          return helper.res(res, { message: 'Token is Invalid' }, 401)
        } else if (err.name === "TokenExpiredError") {
          return helper.res(res, { message: 'Token is Expired' }, 401)
        }
      } else {
        req.roleId = decoded.roleId
      }
      next()
    })
  }
}
