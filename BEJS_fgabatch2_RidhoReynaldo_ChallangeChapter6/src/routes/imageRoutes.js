const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const imageController = require('../controllers/imageController');

router.post('/images', upload.single('file'), imageController.createImage);

router.get('/images', imageController.getImages);

router.get('/images/:id', imageController.getImage);

router.put('/images/:id', imageController.updateImage);

router.delete('/images/:id', imageController.deleteImage);

module.exports = router;
