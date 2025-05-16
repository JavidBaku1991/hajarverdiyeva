const express = require('express');
const router = express.Router();
const Dissertation = require('../models/Dissertation');

// Get all dissertations
router.get('/', async (req, res) => {
  try {
    const dissertations = await Dissertation.find().sort({ createdAt: -1 });
    res.json(dissertations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dissertations', error: error.message });
  }
});

// Add a new dissertation
router.post('/', async (req, res) => {
  try {
    const dissertation = new Dissertation(req.body);
    const savedDissertation = await dissertation.save();
    res.status(201).json(savedDissertation);
  } catch (error) {
    res.status(400).json({ message: 'Error creating dissertation', error: error.message });
  }
});

// Update a dissertation
router.put('/:id', async (req, res) => {
  try {
    const dissertation = await Dissertation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!dissertation) {
      return res.status(404).json({ message: 'Dissertation not found' });
    }
    res.json(dissertation);
  } catch (error) {
    res.status(400).json({ message: 'Error updating dissertation', error: error.message });
  }
});

// Delete a dissertation
router.delete('/:id', async (req, res) => {
  try {
    const dissertation = await Dissertation.findByIdAndDelete(req.params.id);
    if (!dissertation) {
      return res.status(404).json({ message: 'Dissertation not found' });
    }
    res.json({ message: 'Dissertation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting dissertation', error: error.message });
  }
});

module.exports = router; 