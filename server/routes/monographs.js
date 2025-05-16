const express = require('express');
const router = express.Router();
const Monograph = require('../models/Monograph');

// Get all monographs
router.get('/', async (req, res) => {
  try {
    const monographs = await Monograph.find().sort({ createdAt: -1 });
    res.json(monographs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching monographs', error: error.message });
  }
});

// Add a new monograph
router.post('/', async (req, res) => {
  try {
    const monograph = new Monograph(req.body);
    const savedMonograph = await monograph.save();
    res.status(201).json(savedMonograph);
  } catch (error) {
    res.status(400).json({ message: 'Error creating monograph', error: error.message });
  }
});

// Update a monograph
router.put('/:id', async (req, res) => {
  try {
    const monograph = await Monograph.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!monograph) {
      return res.status(404).json({ message: 'Monograph not found' });
    }
    res.json(monograph);
  } catch (error) {
    res.status(400).json({ message: 'Error updating monograph', error: error.message });
  }
});

// Delete a monograph
router.delete('/:id', async (req, res) => {
  try {
    const monograph = await Monograph.findByIdAndDelete(req.params.id);
    if (!monograph) {
      return res.status(404).json({ message: 'Monograph not found' });
    }
    res.json({ message: 'Monograph deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting monograph', error: error.message });
  }
});

module.exports = router; 