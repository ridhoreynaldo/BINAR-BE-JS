// src/controllers/nasabahController.js

const nasabahService = require('../services/nasabahService');

exports.createNasabah = async (req, res) => {
  try {
    const nasabah = await nasabahService.createNasabah(req.body);
    res.status(201).json(nasabah);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllNasabahs = async (req, res) => {
  try {
    const nasabahs = await nasabahService.getAllNasabahs();
    res.status(200).json(nasabahs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNasabahById = async (req, res) => {
  try {
    const nasabah = await nasabahService.getNasabahById(req.params.id);
    if (nasabah) {
      res.status(200).json(nasabah);
    } else {
      res.status(404).json({ message: 'Nasabah not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateNasabah = async (req, res) => {
  try {
    const nasabah = await nasabahService.updateNasabah(req.params.id, req.body);
    if (nasabah) {
      res.status(200).json(nasabah);
    } else {
      res.status(404).json({ message: 'Nasabah not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteNasabah = async (req, res) => {
  try {
    const nasabah = await nasabahService.deleteNasabah(req.params.id);
    if (nasabah) {
      res.status(204).send(); // No content
    } else {
      res.status(404).json({ message: 'Nasabah not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};