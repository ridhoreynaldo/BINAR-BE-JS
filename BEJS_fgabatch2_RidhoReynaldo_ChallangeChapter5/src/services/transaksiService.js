const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all Transaksi by BankAkun ID
const getTransaksiByBankAkunId = async (bankAkunId) => {
  return await prisma.transaksi.findMany({
    where: { bankAkunId },
  });
};

// Get Transaksi by ID
const getTransaksiById = async (transaksiId) => {
  return await prisma.transaksi.findUnique({
    where: { id: transaksiId },
  });
};

// Create a new Transaksi
const createTransaksi = async (bankAkunId, transaksiData) => {
  return await prisma.transaksi.create({
    data: {
      ...transaksiData,
      bankAkunId,
    }
  });
};

// Update an existing Transaksi
const updateTransaksi = async (transaksiId, transaksiData) => {
  return await prisma.transaksi.update({
    where: { id: transaksiId },
    data: transaksiData
  });
};

// Delete a Transaksi
const deleteTransaksi = async (transaksiId) => {
  return await prisma.transaksi.delete({
    where: { id: transaksiId },
  });
};

module.exports = {
  getTransaksiByBankAkunId,
  getTransaksiById,
  createTransaksi,
  updateTransaksi,
  deleteTransaksi,
};
