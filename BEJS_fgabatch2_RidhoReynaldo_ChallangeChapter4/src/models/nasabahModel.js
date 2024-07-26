// src/models/nasabahModel.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class NasabahModel {
  static async createNasabah(data) {
    return prisma.nasabah.create({
      data,
    });
  }

  static async getAllNasabahs() {
    return prisma.nasabah.findMany();
  }

  static async getNasabahById(id) {
    return prisma.nasabah.findUnique({
      where: { id },
      include: { akuns: true }, // Menginclude akun nasabah
    });
  }

  static async updateNasabah(id, data) {
    return prisma.nasabah.update({
      where: { id },
      data,
    });
  }

  static async deleteNasabah(id) {
    return prisma.nasabah.delete({
      where: { id },
    });
  }
  
}

module.exports = NasabahModel;
