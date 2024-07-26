// src/routes/v1/nasabahRoutes.js

const express = require('express');
const router = express.Router();
const nasabahController = require('../../controllers/nasabahController');

router.post('/', nasabahController.createNasabah);
router.get('/', nasabahController.getAllNasabahs);
router.get('/:id', nasabahController.getNasabahById);
router.put('/:id', nasabahController.updateNasabah);
router.delete('/:id', nasabahController.deleteNasabah);

module.exports = router;
