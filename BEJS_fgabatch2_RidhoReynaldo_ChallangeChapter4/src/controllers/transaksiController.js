// src/controllers/transaksiController.js

const transaksiService = require('../services/transaksiService');

exports.createTransaksi = async (req, res) => {
  try {
    const transaksi = await transaksiService.createTransaksi(req.body);
    res.status(201).json(transaksi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTransaksisByAkun = async (req, res) => {
  try {
    const transaksis = await transaksiService.getTransaksisByAkun(req.params.id_akun);
    res.status(200).json(transaksis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTransaksi = async (req, res) => {
  try {
    const transaksi = await transaksiService.updateTransaksi(req.params.id, req.body);
    if (transaksi) {
      res.status(200).json(transaksi);
    } else {
      res.status(404).json({ message: 'Transaksi not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTransaksi = async (req, res) => {
  try {
    const transaksi = await transaksiService.deleteTransaksi(req.params.id);
    if (transaksi) {
      res.status(204).send(); // No content
    } else {
      res.status(404).json({ message: 'Transaksi not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};