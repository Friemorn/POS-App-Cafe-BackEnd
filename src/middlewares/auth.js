const jwt = require('jsonwebtoken')
const helper = require('../helpers/helpers')

module.exports = {
  verifyAccess: (req, res, next)=>{
    let token = req.headers.authorization
    token = token.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      req.roleId = decoded.roleId
      if(err) return helper.res(res, {message: 'Token is Invalid'}, 403)
      next()
    });
  }
}