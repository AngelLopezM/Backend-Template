const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    const pathStorage = `${__dirname}../../../storage/`
    callback(null, pathStorage)
  },
  filename: function (request, file, callback) {
    const extension = file.originalname.split('.').pop()
    const fileName = `file-${Date.now()}.${extension}`
    callback(null, fileName)
  }
})

const uploadMiddleware = multer({ storage }).array('images', 5)

module.exports = uploadMiddleware
