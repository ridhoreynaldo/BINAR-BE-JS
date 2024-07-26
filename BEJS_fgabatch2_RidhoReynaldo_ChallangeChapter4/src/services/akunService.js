// src/services/akunService.js

const AkunModel = require('../models/akunModel');

exports.createAkun = async (akunData) => {
  return AkunModel.createAkun(akunData);
};

exports.getAkunsByNasabah = async (id_nasabah) => {
  return AkunModel.getAkunsByNasabah(id_nasabah);
};

exports.updateAkun = async (id, akunData) => {
  return AkunModel.updateAkun(id, akunData);
};

exports.deleteAkun = async (id) => {
  return AkunModel.deleteAkun(id);
};