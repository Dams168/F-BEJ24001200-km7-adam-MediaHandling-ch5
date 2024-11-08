const router = require('express').Router();
const multer = require('../libs/multer');
const mediaController = require('../controllers/mediaController');

router.post('/upload-image', multer.single('image'), mediaController.uploadImage);
router.put('/update-image/:id', multer.single('image'), mediaController.updateImage);

module.exports = router;