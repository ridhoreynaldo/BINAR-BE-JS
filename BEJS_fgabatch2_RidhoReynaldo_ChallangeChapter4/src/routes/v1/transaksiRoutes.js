// src/routes/v1/transaksiRoutes.js

const express = require('express');
const router = express.Router();
const transaksiController = require('../../controllers/transaksiController');

router.post('/', transaksiController.createTransaksi);
router.get('/akun/:id_akun', transaksiController.getTransaksisByAkun);
router.put('/:id', transaksiController.updateTransaksi);
router.delete('/:id', transaksiController.deleteTransaksi);

module.exports = router;
