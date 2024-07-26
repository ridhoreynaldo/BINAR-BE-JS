// src/controllers/akunController.js

const akunService = require('../services/akunService');

exports.createAkun = async (req, res) => {
  try {
    const akun = await akunService.createAkun(req.body);
    res.status(201).json(akun);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAkunsByNasabah = async (req, res) => {
  try {
    const akuns = await akunService.getAkunsByNasabah(req.params.id_nasabah);
    res.status(200).json(akuns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAkun = async (req, res) => {
  try {
    const akun = await akunService.updateAkun(req.params.id, req.body);
    if (akun) {
      res.status(200).json(akun);
    } else {
      res.status(404).json({ message: 'Akun not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAkun = async (req, res) => {
  try {
    const akun = await akunService.deleteAkun(req.params.id);
    if (akun) {
      res.status(204).send(); // No content
    } else {
      res.status(404).json({ message: 'Akun not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};