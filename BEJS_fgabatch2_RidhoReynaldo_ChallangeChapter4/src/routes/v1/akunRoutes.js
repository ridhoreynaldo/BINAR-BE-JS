// src/routes/v1/akunRoutes.js

const express = require('express');
const router = express.Router();
const akunController = require('../../controllers/akunController');

router.post('/', akunController.createAkun);
router.get('/nasabah/:id_nasabah', akunController.getAkunsByNasabah);
router.put('/:id', akunController.updateAkun);
router.delete('/:id', akunController.deleteAkun);

module.exports = router;
