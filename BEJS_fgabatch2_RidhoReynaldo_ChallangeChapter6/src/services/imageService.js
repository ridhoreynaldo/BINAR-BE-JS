const { PrismaClient } = require('@prisma/client');
const imagekit = require('../config/imagekit');
const prisma = new PrismaClient();

const uploadImage = async (file, title, description) => {
  const uploadResponse = await imagekit.upload({
    file: file,
    fileName: title,
  });

  const image = await prisma.image.create({
    data: {
      title,
      description,
      url: uploadResponse.url,
    },
  });

  return image;
};

const getAllImages = async () => {
  return await prisma.image.findMany();
};

const getImageById = async (id) => {
  return await prisma.image.findUnique({
    where: { id: parseInt(id) },
  });
};

const updateImage = async (id, title, description) => {
  return await prisma.image.update({
    where: { id: parseInt(id) },
    data: {
      title,
      description,
    },
  });
};

const deleteImage = async (id) => {
  const image = await prisma.image.findUnique({ where: { id: parseInt(id) } });

  if (image) {
    const fileId = image.url.split('/').pop().split('.')[0];
    await imagekit.deleteFile(fileId);

    return await prisma.image.delete({ where: { id: parseInt(id) } });
  }

  throw new Error('Image not found');
};

module.exports = {
  uploadImage,
  getAllImages,
  getImageById,
  updateImage,
  deleteImage,
};
