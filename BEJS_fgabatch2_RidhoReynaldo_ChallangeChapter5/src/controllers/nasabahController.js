// src/controllers/nasabahController.js
const { getAllNasabah, getNasabahById, createNasabah, updateNasabah, deleteNasabah } = require('../services/nasabahService');

exports.getAllNasabah = async (req, res) => {
  try {
    const nasabahs = await getAllNasabah();
    res.status(200).json(nasabahs);
  } catch (error) {
    console.error('Failed to get all Nasabahs:', error);
    res.status(500).json({ error: 'Failed to retrieve Nasabahs' });
  }
};

exports.getNasabahById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }
    const nasabah = await getNasabahById(id);
    if (!nasabah) {
      return res.status(404).json({ error: 'Nasabah not found' });
    }
    res.status(200).json(nasabah);
  } catch (error) {
    console.error('Failed to get Nasabah by ID:', error);
    res.status(500).json({ error: 'Failed to retrieve Nasabah' });
  }
};

exports.createNasabah = async (req, res) => {
  try {
    const nasabah = await createNasabah(req.body);
    res.status(201).json(nasabah);
  } catch (error) {
    console.error('Failed to create Nasabah:', error);
    res.status(500).json({ error: 'Failed to create Nasabah' });
  }
};

exports.updateNasabah = async (req, res) => {
  try {
    const { id } = req.params;
    const nasabahData = req.body;
    // Check if required fields are present
    if (!id || !nasabahData) {
      return res.status(400).json({ error: 'ID and data are required' });
    }
    const updatedNasabah = await updateNasabah(id, nasabahData);
    res.status(200).json(updatedNasabah);
  } catch (error) {
    if (error.message === 'Email already in use') {
      res.status(400).json({ error: 'Email already in use' });
    } else {
      console.error('Failed to update Nasabah:', error);
      res.status(500).json({ error: 'Failed to update Nasabah' });
    }
  }
};

exports.deleteNasabah = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }
    await deleteNasabah(id);
    res.status(204).send();
  } catch (error) {
    console.error('Failed to delete Nasabah:', error);
    if (error.message === 'Failed to delete Nasabah') {
      res.status(404).json({ error: 'Nasabah not found' });
    } else {
      res.status(500).json({ error: 'Failed to delete Nasabah' });
    }
  }
};
