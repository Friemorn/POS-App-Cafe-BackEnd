const bcrypt = require('bcryptjs');
const helper = require('../helpers/helpers')
const userModels = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = {
  register: async (req, res) => {
    const {email, password, firstName, lastName} = req.body
    const isUser = await userModels.getUserbyEmail(email)
    if (isUser.length !== 0) return helper.res(res, {message: 'Email is Already Registered'}, 201, null)
      const data = {
        email,
        password,
        firstName,
        lastName,
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(data.password, salt, function(err, hash) {
          data.password = hash
          userModels.register(data)
            .then((result) => {
              helper.res(res, result, 201, null)
            })
            .catch((err) => {
              console.log(err)
            })
        });
    });
  },
  login: (req, res) =>{
    const {email, password} = req.body
    userModels.getUserbyEmail(email)
      .then((result) => {
        if (result.length < 1) return helper.res(res, {message: 'Email Not Found!'}, 201, null)
        
        const user = result[0]
        const hash = user.password
        bcrypt.compare(password, hash).then((resCompare) => {
          if(!resCompare) return helper.res(res, {message: 'Password is Wrong!'}, 201, null)
          const payload = {
            userId: user.userId,
            email: user.email,
            roleId: user.roleId
          }
          jwt.sign( payload, process.env.SECRET_KEY, { expiresIn: '12h' }, (err, token)=>{
            user.token = token
            delete user.password
            delete user.createdAt
            delete user.updatedAt
            helper.res(res, user, 200)
          });
        });
      })
      .catch((err) => {
        console.log(err)
      })
  }
}