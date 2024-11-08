const router = require('express').Router();
const multer = require('../libs/multer');
const mediaController = require('../controllers/mediaController');

router.post('/upload-image', multer.single('image'), mediaController.uploadImage);
router.put('/update-image/:id', multer.single('image'), mediaController.updateImage);
router.delete('/delete-image/:id', mediaController.deleteImage);
router.get('/get-image', mediaController.getAllimage);
router.get('/get-image/:id', mediaController.getImageById);

module.exports = router;