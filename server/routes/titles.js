const express = require('express');
const router = express.Router();
const Title = require('../models/Title');

// Get all titles
router.get('/', async (req, res) => {
  try {
    const titles = await Title.find().sort({ createdAt: -1 });
    res.json(titles);
  } catch (error) {
    console.error('Error fetching titles:', error);
    res.status(500).json({ message: 'Error fetching titles', error: error.message });
  }
});

// Add a new title
router.post('/', async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    console.log('Request headers:', req.headers);
    
    if (!req.body.title) {
      console.log('Title is missing from request body');
      return res.status(400).json({ message: 'Title is required' });
    }

    const title = new Title({
      title: req.body.title
    });

    console.log('Creating new title:', title);
    await title.save();
    console.log('Title saved successfully:', title);
    
    res.status(201).json(title);
  } catch (error) {
    console.error('Error saving title:', error);
    res.status(500).json({ message: 'Error saving title', error: error.message });
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
    console.error('Error deleting title:', error);
    res.status(500).json({ message: 'Error deleting title', error: error.message });
  }
});

module.exports = router; 