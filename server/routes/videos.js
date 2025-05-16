const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

// Initialize test videos if database is empty
router.get('/init', async (req, res) => {
  try {
    const count = await Video.countDocuments();
    if (count === 0) {
      const testVideos = [
        {
          videoId: 'K-wCck8Vkbw',
          title: 'Test Video 1',
          description: 'This is a test video',
          language: 'en'
        },
        {
          videoId: 'X0IB02XbXXQ',
          title: 'Test Video 2',
          description: 'This is another test video',
          language: 'en'
        }
      ];
      await Video.insertMany(testVideos);
      res.json({ message: 'Test videos added successfully' });
    } else {
      res.json({ message: 'Database already has videos' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error initializing videos', error: error.message });
  }
});

// Get all videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    console.log('Number of videos found:', videos.length);
    console.log('Videos details:', JSON.stringify(videos, null, 2));
    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'Error fetching videos', error: error.message });
  }
});

// Add a new video
router.post('/', async (req, res) => {
  try {
    const video = new Video(req.body);
    const savedVideo = await video.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    res.status(400).json({ message: 'Error creating video', error: error.message });
  }
});

// Update a video
router.put('/:id', async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(400).json({ message: 'Error updating video', error: error.message });
  }
});

// Delete a video
router.delete('/:id', async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting video', error: error.message });
  }
});

module.exports = router; 