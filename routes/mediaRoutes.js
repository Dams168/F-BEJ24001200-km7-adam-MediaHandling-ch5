const router = require('express').Router();
const multer = require('../libs/multer');
const mediaController = require('../controllers/mediaController');

router.post('/upload-image', multer.single('image'), mediaController.uploadImage);

module.exports = router;