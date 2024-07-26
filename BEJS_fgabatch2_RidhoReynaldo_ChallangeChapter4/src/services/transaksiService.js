// src/services/transaksiService.js

const TransaksiModel = require('../models/transaksiModel');

exports.createTransaksi = async (transaksiData) => {
  return TransaksiModel.createTransaksi(transaksiData);
};

exports.getTransaksisByAkun = async (id_akun) => {
  return TransaksiModel.getTransaksisByAkun(id_akun);
};

exports.updateTransaksi = async (id, transaksiData) => {
  return TransaksiModel.updateTransaksi(id, transaksiData);
};

exports.deleteTransaksi = async (id) => {
  return TransaksiModel.deleteTransaksi(id);
};