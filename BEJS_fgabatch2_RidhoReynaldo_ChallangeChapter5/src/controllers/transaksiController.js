const { getTransaksiByBankAkunId, getTransaksiById, createTransaksi, updateTransaksi, deleteTransaksi } = require('../services/transaksiService');

exports.getTransaksiByBankAkunId = async (req, res) => {
  const transaksis = await getTransaksiByBankAkunId(req.params.bankAkunId);
  res.status(200).json(transaksis);
};

exports.getTransaksiById = async (req, res) => {
  const transaksi = await getTransaksiById(req.params.id);
  res.status(200).json(transaksi);
};

exports.createTransaksi = async (req, res) => {
  const transaksi = await createTransaksi(req.body.bankAkunId, req.body);
  res.status(201).json(transaksi);
};

exports.updateTransaksi = async (req, res) => {
  const transaksi = await updateTransaksi(req.params.id, req.body);
  res.status(200).json(transaksi);
};

exports.deleteTransaksi = async (req, res) => {
  await deleteTransaksi(req.params.id);
  res.status(204).send();
};
