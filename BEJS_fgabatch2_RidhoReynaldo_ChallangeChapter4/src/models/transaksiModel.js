// src/models/transaksiModel.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class TransaksiModel {
  static async createTransaksi(data) {
    return prisma.transaksi.create({
      data,
    });
  }

  static async getTransaksisByAkun(id_akun) {
    return prisma.transaksi.findMany({
      where: { id_akun },
    });
  }

  static async updateTransaksi(id, data) {
    return prisma.transaksi.update({
      where: { id },
      data,
    });
  }

  static async deleteTransaksi(id) {
    return prisma.transaksi.delete({
      where: { id },
    });
  }
}

module.exports = TransaksiModel;
