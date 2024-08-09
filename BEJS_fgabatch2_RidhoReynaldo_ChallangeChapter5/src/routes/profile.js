const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const profileController = require('../controllers/profileController');

const router = express.Router();

router.get('/:nasabahId', authenticateToken, profileController.getProfileByNasabahId);
router.post('/', authenticateToken, profileController.createProfile);
router.put('/:nasabahId', authenticateToken, profileController.updateProfile);
router.delete('/:id', authenticateToken, profileController.deleteProfile);

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: CRUD operations for Profile
 */

/**
 * @swagger
 * /profile/{nasabahId}:
 *   get:
 *     summary: Get Profile by Nasabah ID
 *     tags: [Profile]
 *     parameters:
 *       - name: nasabahId
 *         in: path
 *         required: true
 *         description: ID of the Nasabah
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The Profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Profile not found
 */

/**
 * @swagger
 * /profile:
 *   post:
 *     summary: Create a new Profile
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       201:
 *         description: Profile created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 */

/**
 * @swagger
 * /profile/{id}:
 *   put:
 *     summary: Update an existing Profile
 *     tags: [Profile]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Profile
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       200:
 *         description: Profile updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Profile not found
 */

/**
 * @swagger
 * /profile/{id}:
 *   delete:
 *     summary: Delete a Profile
 *     tags: [Profile]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Profile
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Profile deleted
 *       404:
 *         description: Profile not found
 */

module.exports = router;
