const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const nasabahController = require('../controllers/nasabahController');

const router = express.Router();

router.get('/', authenticateToken, nasabahController.getAllNasabah);
router.get('/:id', authenticateToken, nasabahController.getNasabahById);
router.post('/', authenticateToken, nasabahController.createNasabah);
router.put('/:id', authenticateToken, nasabahController.updateNasabah);
router.delete('/:id', authenticateToken, nasabahController.deleteNasabah);


/**
 * @swagger
 * tags:
 *   name: Nasabah
 *   description: CRUD operations for Nasabah
 */

/**
 * @swagger
 * /nasabah:
 *   get:
 *     summary: Get all Nasabah
 *     tags: [Nasabah]
 *     responses:
 *       200:
 *         description: A list of Nasabah
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Nasabah'
 */

/**
 * @swagger
 * /nasabah/{id}:
 *   get:
 *     summary: Get a single Nasabah by ID
 *     tags: [Nasabah]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Nasabah
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The Nasabah
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Nasabah'
 *       404:
 *         description: Nasabah not found
 */

/**
 * @swagger
 * /nasabah:
 *   post:
 *     summary: Create a new Nasabah
 *     tags: [Nasabah]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Nasabah'
 *     responses:
 *       201:
 *         description: Nasabah created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Nasabah'
 */

/**
 * @swagger
 * /nasabah/{id}:
 *   put:
 *     summary: Update an existing Nasabah
 *     tags: [Nasabah]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Nasabah
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Nasabah'
 *     responses:
 *       200:
 *         description: Nasabah updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Nasabah'
 *       404:
 *         description: Nasabah not found
 */

/**
 * @swagger
 * /nasabah/{id}:
 *   delete:
 *     summary: Delete a Nasabah
 *     tags: [Nasabah]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Nasabah
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Nasabah deleted
 *       404:
 *         description: Nasabah not found
 */

module.exports = router;
