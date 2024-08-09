const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all BankAkun by Nasabah ID
const getBankAkunsByNasabahId = async (nasabahId) => {
  return await prisma.bankAkun.findMany({
    where: { nasabahId },
    include: {
      transaksi: true,
    }
  });
};

// Get BankAkun by ID
const getBankAkunById = async (bankAkunId) => {
  return await prisma.bankAkun.findUnique({
    where: { id: bankAkunId },
    include: {
      transaksi: true,
    }
  });
};

const createBankAkun = async (nasabahId, bankAkunData) => {
  try {
    // Periksa nilai nasabahId
    if (!nasabahId) {
      throw new Error('Nasabah ID is required');
    }

    // Buat BankAkun
    return await prisma.bankAkun.create({
      data: {
        ...bankAkunData,  // Menggunakan data dari bankAkunData yang diterima
        nasabah: {
          connect: { id: nasabahId }  // Menghubungkan dengan ID Nasabah
        }
      }
    });
  } catch (error) {
    console.error('Error creating bank akun:', error);
    throw new Error('Failed to create BankAkun');
  }
};

// Update an existing BankAkun
const updateBankAkun = async (bankAkunId, bankAkunData) => {
  try {
    // Check if the BankAkun record exists
    const existingBankAkun = await prisma.bankAkun.findUnique({
      where: { id: bankAkunId }
    });

    if (!existingBankAkun) {
      throw new Error('BankAkun record not found');
    }

    // Proceed with the update
    return await prisma.bankAkun.update({
      where: { id: bankAkunId },
      data: bankAkunData
    });
  } catch (error) {
    console.error('Error updating BankAkun:', error);
    throw new Error('Failed to update BankAkun');
  }
};

// Delete a BankAkun
const deleteBankAkun = async (bankAkunId) => {
  return await prisma.bankAkun.delete({
    where: { id: bankAkunId },
  });
};

module.exports = {
  getBankAkunsByNasabahId,
  getBankAkunById,
  createBankAkun,
  updateBankAkun,
  deleteBankAkun,
};
