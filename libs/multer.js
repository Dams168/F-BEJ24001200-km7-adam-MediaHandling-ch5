const multer = require('multer');


const upload = multer({
    fileFilter: (req, file, cb) => {
        const allowedType = ["image/jpeg", "image/jpg", "image/png"]

        if (allowedType.includes(file.mimetype)) {
            cb(null, true)
        } else {
            const err = new Error("Type file harus jpeg, jpg, or png")
            cb(err, false)
        }
    },
    onError: (err, next) => {
        next(err)
    },
})

module.exports = upload;