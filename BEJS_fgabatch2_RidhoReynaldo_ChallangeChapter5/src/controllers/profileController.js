const { getProfileByNasabahId, createProfile, updateProfile, deleteProfile } = require('../services/profileService');

exports.getProfileByNasabahId = async (req, res) => {
  try {
    const profile = await getProfileByNasabahId(req.params.nasabahId);
    if (!profile) {
      return res.status(200).json({ error: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
};

exports.createProfile = async (req, res) => {
  try {
    // Ambil ID Nasabah dari token JWT yang sudah di-decode
    const nasabahId = req.nasabah?.nasabahId; // Gunakan nasabahId dari payload JWT
    if (!nasabahId) {
      return res.status(400).json({ error: 'Nasabah ID is required' });
    }
    const profileData = req.body;
    // Validasi data yang dikirimkan
    if (!profileData.name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    // Panggil service untuk membuat Profile
    const profile = await createProfile(nasabahId, profileData);
    res.status(201).json(profile);
  } catch (error) {
    console.error('Failed to create Profile:', error);
    res.status(500).json({ error: 'Failed to create Profile' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { nasabahId } = req.params;
    if (!nasabahId) {
      return res.status(400).json({ error: 'Nasabah ID is required' });
    }
    const profile = await updateProfile(nasabahId, req.body);
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    await deleteProfile(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ error: 'Failed to delete profile' });
  }
};
