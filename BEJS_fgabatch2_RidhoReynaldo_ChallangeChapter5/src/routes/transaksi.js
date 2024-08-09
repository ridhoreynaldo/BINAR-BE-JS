const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const transaksiController = require('../controllers/transaksiController');

const router = express.Router();

router.get('/:bankAkunId', authenticateToken, transaksiController.getTransaksiByBankAkunId);
router.get('/transaksi/:id', authenticateToken, transaksiController.getTransaksiById);
router.post('/', authenticateToken, transaksiController.createTransaksi);
router.put('/:id', authenticateToken, transaksiController.updateTransaksi);
router.delete('/:id', authenticateToken, transaksiController.deleteTransaksi);

/**
 * @swagger
 * tags:
 *   name: Transaksi
 *   description: CRUD operations for Transaksi
 */

/**
 * @swagger
 * /transaksi/{bankAkunId}:
 *   get:
 *     summary: Get all Transaksi by BankAkun ID
 *     tags: [Transaksi]
 *     parameters:
 *       - name: bankAkunId
 *         in: path
 *         required: true
 *         description: ID of the BankAkun
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of Transaksi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaksi'
 */

/**
 * @swagger
 * /transaksi/{id}:
 *   get:
 *     summary: Get a Transaksi by ID
 *     tags: [Transaksi]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Transaksi
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The Transaksi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaksi'
 *       404:
 *         description: Transaksi not found
 */

/**
 * @swagger
 * /transaksi:
 *   post:
 *     summary: Create a new Transaksi
 *     tags: [Transaksi]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaksi'
 *     responses:
 *       201:
 *         description: Transaksi created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaksi'
 */

/**
 * @swagger
 * /transaksi/{id}:
 *   put:
 *     summary: Update an existing Transaksi
 *     tags: [Transaksi]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Transaksi
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaksi'
 *     responses:
 *       200:
 *         description: Transaksi updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaksi'
 *       404:
 *         description: Transaksi not found
 */

/**
 * @swagger
 * /transaksi/{id}:
 *   delete:
 *     summary: Delete a Transaksi
 *     tags: [Transaksi]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Transaksi
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Transaksi deleted
 *       404:
 *         description: Transaksi not found
 */

module.exports = router;
