const multer = require('multer')
const helper = require('../helpers/helpers')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb (null, './uploads')
    },
    filename: function (req, file, cb) {
      cb (null, new Date().toISOString().replace(/[\/\\:]/g, "_") + file.originalname)
    }
  })

  const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png') {
        cb (null, true);
    } else {
        cb ('Error: Only Images with Extentions (jpeg/jpg/png) are Allowed', false);
    }
  }
  
upload = multer({ storage: storage,
  limits : {fileSize: 1000000},
  fileFilter: fileFilter })

module.exports = {
    upload
}