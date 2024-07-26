// src/services/nasabahService.js

const NasabahModel = require('../models/nasabahModel');

exports.createNasabah = async (nasabahData) => {
  return NasabahModel.createNasabah(nasabahData);
};

exports.getAllNasabahs = async () => {
  return NasabahModel.getAllNasabahs();
};

exports.getNasabahById = async (id) => {
  return NasabahModel.getNasabahById(id);
};

exports.updateNasabah = async (id, nasabahData) => {
  return NasabahModel.updateNasabah(id, nasabahData);
};

exports.deleteNasabah = async (id) => {
  return NasabahModel.deleteNasabah(id);
};