// src/services/nasabahService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const getAllNasabah = async () => {
  try {
    return await prisma.nasabah.findMany();
  } catch (error) {
    console.error('Error retrieving all Nasabahs:', error);
    throw new Error('Failed to retrieve Nasabahs');
  }
};

const getNasabahById = async (id) => {
  try {
    return await prisma.nasabah.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('Error retrieving Nasabah by ID:', error);
    throw new Error('Failed to retrieve Nasabah');
  }
};

const createNasabah = async (nasabahData) => {
  try {
    const hashedPassword = await bcrypt.hash(nasabahData.password, SALT_ROUNDS);
    return await prisma.nasabah.create({
      data: {
        ...nasabahData,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error('Error creating Nasabah:', error);
    throw new Error('Failed to create Nasabah');
  }
};

const updateNasabah = async (nasabahId, nasabahData) => {
  try {
    // Check if new email is already in use
    if (nasabahData.email) {
      const existingNasabah = await prisma.nasabah.findUnique({
        where: { email: nasabahData.email },
      });
      if (existingNasabah && existingNasabah.id !== nasabahId) {
        throw new Error('Email already in use');
      }
    }

    // Hash password if it’s provided
    if (nasabahData.password) {
      nasabahData.password = await bcrypt.hash(nasabahData.password, SALT_ROUNDS);
    }

    // Update Nasabah
    return await prisma.nasabah.update({
      where: { id: nasabahId },
      data: nasabahData,
    });
  } catch (error) {
    console.error('Error updating Nasabah:', error);
    throw error;
  }
};

const deleteNasabah = async (id) => {
  try {
    return await prisma.nasabah.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Error deleting Nasabah:', error);
    throw new Error('Failed to delete Nasabah');
  }
};

module.exports = { getAllNasabah, getNasabahById, createNasabah, updateNasabah, deleteNasabah };
