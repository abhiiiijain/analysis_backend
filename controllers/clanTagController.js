const ClanTag = require('../models/clanTag');

// Get all clan tags
exports.getAllClanTags = async (req, res) => {
  try {
    const clanTags = await ClanTag.find();
    res.status(200).json(clanTags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new clan tag
exports.createClanTag = async (req, res) => {
  const { clanTag, association, status } = req.body;

  try {
    // Validate enum values
    if (!['GFL', 'FWL', 'BL'].includes(association)) {
      return res.status(400).json({ message: 'Invalid association value. Allowed: GFL, FWL, BL' });
    }
    if (!['Active', 'Inactive'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value. Allowed: Active, Inactive' });
    }

    const newClanTag = new ClanTag({ clanTag, association, status });
    await newClanTag.save();
    res.status(201).json(newClanTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a clan tag
exports.deleteClanTag = async (req, res) => {
  const { id } = req.params;

  try {
    await ClanTag.findByIdAndDelete(id);
    res.status(200).json({ message: 'ClanTag deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch all clan tags
exports.getClanTags = async (req, res) => {
  try {
    const clans = await ClanTag.find({}); // Fetch all clan tags
    res.json(clans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};