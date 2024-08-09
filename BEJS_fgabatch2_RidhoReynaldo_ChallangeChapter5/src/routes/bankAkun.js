const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const bankAkunController = require('../controllers/bankAkunController');

const router = express.Router();

router.get('/:nasabahId', authenticateToken, bankAkunController.getBankAkunsByNasabahId);
router.get('/akun/:id', authenticateToken, bankAkunController.getBankAkunById);
router.post('/', authenticateToken, bankAkunController.createBankAkun);
router.put('/:id', authenticateToken, bankAkunController.updateBankAkun);
router.delete('/:id', authenticateToken, bankAkunController.deleteBankAkun);

/**
 * @swagger
 * tags:
 *   name: BankAkun
 *   description: CRUD operations for BankAkun
 */

/**
 * @swagger
 * /bankAkun/{nasabahId}:
 *   get:
 *     summary: Get all BankAkun by Nasabah ID
 *     tags: [BankAkun]
 *     parameters:
 *       - name: nasabahId
 *         in: path
 *         required: true
 *         description: ID of the Nasabah
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: A list of BankAkun
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BankAkun'
 */

/**
 * @swagger
 * /bankAkun/akun/{id}:
 *   get:
 *     summary: Get a BankAkun by ID
 *     tags: [BankAkun]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the BankAkun
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: The BankAkun
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BankAkun'
 *       404:
 *         description: BankAkun not found
 */

/**
 * @swagger
 * /bankAkun:
 *   post:
 *     summary: Create a new BankAkun
 *     tags: [BankAkun]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BankAkun'
 *     responses:
 *       201:
 *         description: BankAkun created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BankAkun'
 */

/**
 * @swagger
 * /bankAkun/{id}:
 *   put:
 *     summary: Update an existing BankAkun
 *     tags: [BankAkun]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the BankAkun
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BankAkun'
 *     responses:
 *       200:
 *         description: BankAkun updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BankAkun'
 *       404:
 *         description: BankAkun not found
 */

/**
 * @swagger
 * /bankAkun/{id}:
 *   delete:
 *     summary: Delete a BankAkun
 *     tags: [BankAkun]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the BankAkun
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: BankAkun deleted
 *       404:
 *         description: BankAkun not found
 */

module.exports = router;
