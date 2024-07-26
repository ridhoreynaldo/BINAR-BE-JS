// src/routes/v2/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.get('/', userController.getAllUsers); // Bisa ada perubahan di versi ini
router.get('/:id', userController.getUserById); // Bisa ada perubahan di versi ini
router.post('/', userController.createUser); // Bisa ada perubahan di versi ini
router.put('/:id', userController.updateUser); // Bisa ada perubahan di versi ini
router.delete('/:id', userController.deleteUser); // Bisa ada perubahan di versi ini

module.exports = router;
