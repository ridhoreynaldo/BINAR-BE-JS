// src/controllers/bankAkunController.js
const { getBankAkunsByNasabahId, getBankAkunById, createBankAkun, updateBankAkun, deleteBankAkun } = require('../services/bankAkunService');

exports.getBankAkunsByNasabahId = async (req, res) => {
  try {
    const { nasabahId } = req.params;
    if (!nasabahId) {
      return res.status(400).json({ error: 'Nasabah ID is required' });
    }
    const bankAkuns = await getBankAkunsByNasabahId(nasabahId);
    res.status(200).json(bankAkuns);
  } catch (error) {
    console.error('Failed to get BankAkuns by Nasabah ID:', error);
    res.status(500).json({ error: 'Failed to retrieve BankAkuns' });
  }
};

exports.getBankAkunById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }
    const bankAkun = await getBankAkunById(id);
    if (!bankAkun) {
      return res.status(404).json({ error: 'BankAkun not found' });
    }

    res.status(200).json(bankAkun);
  } catch (error) {
    console.error('Failed to get BankAkun by ID:', error);
    res.status(500).json({ error: 'Failed to retrieve BankAkun' });
  }
};

exports.createBankAkun = async (req, res) => {
  try {
    const nasabahId = req.nasabah?.nasabahId; // Gunakan nasabahId dari payload JWT
    if (!nasabahId) {
      return res.status(400).json({ error: 'Nasabah ID is required' });
    }
    const bankAkunData = req.body;
    if (!bankAkunData.accountNo || bankAkunData.balance === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Panggil service untuk membuat BankAkun
    const bankAkun = await createBankAkun(nasabahId, bankAkunData);
    res.status(201).json(bankAkun);
  } catch (error) {
    console.error('Failed to create BankAkun:', error);
    res.status(500).json({ error: 'Failed to create BankAkun' });
  }
};
exports.updateBankAkun = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }
    const bankAkun = await updateBankAkun(id, req.body);
    res.status(200).json(bankAkun);
  } catch (error) {
    console.error('Failed to update BankAkun:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBankAkun = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }
    await deleteBankAkun(id);
    res.status(204).send();
  } catch (error) {
    console.error('Failed to delete BankAkun:', error);
    res.status(500).json({ error: 'Failed to delete BankAkun' });
  }
};
