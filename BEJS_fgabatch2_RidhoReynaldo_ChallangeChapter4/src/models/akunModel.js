// src/models/akunModel.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AkunModel {
  static async createAkun(data) {
    return prisma.akun.create({
      data,
    });
  }

  static async getAkunsByNasabah(id_nasabah) {
    return prisma.akun.findMany({
      where: { id_nasabah },
    });
  }

  static async updateAkun(id, data) {
    return prisma.akun.update({
      where: { id },
      data,
    });
  }

  static async deleteAkun(id) {
    return prisma.akun.delete({
      where: { id },
    });
  }
}

module.exports = AkunModel;
