const express = require('express');
const router = express.Router();
const Title = require('../models/Title');

// Get all titles
router.get('/', async (req, res) => {
  try {
    const titles = await Title.find().sort({ createdAt: -1 });
    res.json(titles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching titles', error: error.message });
  }
});

// Add a new title
router.post('/', async (req, res) => {
  try {
    const title = new Title(req.body);
    const savedTitle = await title.save();
    res.status(201).json(savedTitle);
  } catch (error) {
    res.status(400).json({ message: 'Error creating title', error: error.message });
  }
});

// Update a title
router.put('/:id', async (req, res) => {
  try {
    const title = await Title.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!title) {
      return res.status(404).json({ message: 'Title not found' });
    }
    res.json(title);
  } catch (error) {
    res.status(400).json({ message: 'Error updating title', error: error.message });
  }
});

// Delete a title
router.delete('/:id', async (req, res) => {
  try {
    const title = await Title.findByIdAndDelete(req.params.id);
    if (!title) {
      return res.status(404).json({ message: 'Title not found' });
    }
    res.json({ message: 'Title deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting title', error: error.message });
  }
});

module.exports = router; 