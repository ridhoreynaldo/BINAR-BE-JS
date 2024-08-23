const imageService = require('../services/imageService');

const createImage = async (req, res) => {
  try {
    const { title, description } = req.body;
    const file = req.file;

    console.log('Title:', title);
    console.log('Description:', description);
    console.log('File:', file);

    if (!file) {
      return res.status(400).json({ message: 'No file provided' });
    }

    const uploadedImage = await imageService.uploadImage(file.buffer, title, description);
    res.status(201).json(uploadedImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getImages = async (req, res) => {
  try {
    const images = await imageService.getAllImages();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getImage = async (req, res) => {
  try {
    const image = await imageService.getImageById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateImage = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = await imageService.updateImage(req.params.id, title, description);
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteImage = async (req, res) => {
  try {
    await imageService.deleteImage(req.params.id);
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createImage,
  getImages,
  getImage,
  updateImage,
  deleteImage,
};
