const multer = require('multer')
const path = require('path')
const helpers = require('../helpers/helpers')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/[\/\\:]/g, '_') + file.originalname)
  }
})

function upload (req, res, next) {
  const uploadFile = multer({
    storage: storage,
    limits: { fileSize: 100000 },
    fileFilter: function (req, file, cb) {
      const extFile = path.extname(file.originalname)
      if (extFile === '.jpeg' || extFile === '.jpg' || extFile === '.png') {
        cb(null, true)
      } else {
        cb('Image Only!', false)
      }
    }
  }).single('image')

  uploadFile(req, res, function (err) {
    if (err) {
      if (err == 'Image Only!') {
        return helpers.res(res, { message: 'Only Images with Extentions (jpeg/jpg/png) are Allowed' }, 403)
      } else {
        return helpers.res(res, { message: 'File Too Large' }, 403)
      }
    } else {
      next()
    }
  })
}


module.exports = {
  upload
}
