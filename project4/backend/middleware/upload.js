const multer = require('multer')
const path = require('path')

//source- https://www.youtube.com/watch?v=i8yxx6V9UdM
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')  //save to backend/uploads/ folder
  },
  filename: (req, file, cb) => {
    //Give each file a unique name to avoid overwriting
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
    cb(null, uniqueName)
  }
})

//Only allow image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/
  const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase())
  if (isValid) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed'))
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } //5 MB max
})

module.exports = upload