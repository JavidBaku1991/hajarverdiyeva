const express = require('express');
const router = express.Router();
const Interview = require('../models/Interview');

// Get all interviews
router.get('/', async (req, res) => {
  try {
    const interviews = await Interview.find().sort({ date: -1 });
    console.log('Fetched interviews:', interviews);
    res.json(interviews);
  } catch (error) {
    console.error('Error fetching interviews:', error);
    res.status(500).json({ message: 'Error fetching interviews', error: error.message });
  }
});

// Add a new interview
router.post('/', async (req, res) => {
  try {
    console.log('Received interview data:', req.body);
    const interview = new Interview(req.body);
    const savedInterview = await interview.save();
    console.log('Saved interview:', savedInterview);
    res.status(201).json(savedInterview);
  } catch (error) {
    console.error('Error creating interview:', error);
    res.status(400).json({ message: 'Error creating interview', error: error.message });
  }
});

// Update an interview
router.put('/:id', async (req, res) => {
  try {
    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }
    res.json(interview);
  } catch (error) {
    res.status(400).json({ message: 'Error updating interview', error: error.message });
  }
});

// Delete an interview
router.delete('/:id', async (req, res) => {
  try {
    const interview = await Interview.findByIdAndDelete(req.params.id);
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }
    res.json({ message: 'Interview deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting interview', error: error.message });
  }
});

module.exports = router; 