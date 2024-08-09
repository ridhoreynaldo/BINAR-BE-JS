const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get Profile by Nasabah ID
const getProfileByNasabahId = async (nasabahId) => {
  return await prisma.profile.findUnique({
    where: { nasabahId },
  });
};

// Create a new Profile
const createProfile = async (nasabahId, profileData) => {
  return await prisma.profile.create({
    data: {
      name: profileData.name,
      nasabah: {
        connect: { id: nasabahId }
      }
    }
  });
};

const updateProfile = async (nasabahId, profileData) => {
  // Check if the profile exists
  const existingProfile = await prisma.profile.findUnique({
    where: { nasabahId: nasabahId },
  });

  if (!existingProfile) {
    throw new Error('Profile not found');
  }

  // Proceed with the update
  return await prisma.profile.update({
    where: { nasabahId: nasabahId },
    data: profileData,
  });
};

// Delete a Profile
const deleteProfile = async (profileId) => {
  return await prisma.profile.delete({
    where: { id: profileId },
  });
};

module.exports = {
  getProfileByNasabahId,
  createProfile,
  updateProfile,
  deleteProfile,
};
