const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const mongoose = require('mongoose');

// Initialize test videos if database is empty
router.get('/init', async (req, res) => {
  try {
    const count = await Video.countDocuments();
    if (count === 0) {
      const testVideos = [
        {
          videoId: 'K-wCck8Vkbw',
          title: 'Video 1',
          description: 'First video description',
          language: 'en'
        },
        {
          videoId: '0i23vP2xULE',
          title: 'Video 2',
          description: 'Second video description',
          language: 'en'
        },
        {
          videoId: '3jnJmZS1qNc',
          title: 'Video 3',
          description: 'Third video description',
          language: 'en'
        },
        {
          videoId: 'qsP-kGrf1MI',
          title: 'Video 4',
          description: 'Fourth video description',
          language: 'en'
        },
        {
          videoId: 'IVUfwIkdfoA',
          title: 'Video 5',
          description: 'Fifth video description',
          language: 'en'
        },
        {
          videoId: 'KFJAqsjZVQw',
          title: 'Video 6',
          description: 'Sixth video description',
          language: 'en'
        },
        {
          videoId: 'OQp3ifptP2k',
          title: 'Video 7',
          description: 'Seventh video description',
          language: 'en'
        }
      ];
      await Video.insertMany(testVideos);
      res.json({ message: 'Test videos added successfully' });
    } else {
      // If videos exist, delete them and reinitialize
      await Video.deleteMany({});
      const testVideos = [
        {
          videoId: 'K-wCck8Vkbw',
          title: 'Video 1',
          description: 'First video description',
          language: 'en'
        },
        {
          videoId: '0i23vP2xULE',
          title: 'Video 2',
          description: 'Second video description',
          language: 'en'
        },
        {
          videoId: '3jnJmZS1qNc',
          title: 'Video 3',
          description: 'Third video description',
          language: 'en'
        },
        {
          videoId: 'qsP-kGrf1MI',
          title: 'Video 4',
          description: 'Fourth video description',
          language: 'en'
        },
        {
          videoId: 'IVUfwIkdfoA',
          title: 'Video 5',
          description: 'Fifth video description',
          language: 'en'
        },
        {
          videoId: 'KFJAqsjZVQw',
          title: 'Video 6',
          description: 'Sixth video description',
          language: 'en'
        },
        {
          videoId: 'OQp3ifptP2k',
          title: 'Video 7',
          description: 'Seventh video description',
          language: 'en'
        }
      ];
      await Video.insertMany(testVideos);
      res.json({ message: 'Videos reinitialized successfully' });
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
    const { id } = req.params;
    console.log('Attempting to delete video with id:', id);

    // First try to find the video by videoId
    const video = await Video.findOne({ videoId: id });
    
    if (!video) {
      console.log('Video not found by videoId, trying ObjectId');
      // If not found by videoId, try ObjectId
      if (mongoose.Types.ObjectId.isValid(id)) {
        const videoById = await Video.findById(id);
        if (videoById) {
          await Video.findByIdAndDelete(id);
          return res.json({ message: 'Video deleted successfully' });
        }
      }
      // Get all available videoIds for debugging
      const allVideos = await Video.find({}, 'videoId');
      const availableVideoIds = allVideos.map(v => v.videoId);
      return res.status(404).json({ 
        message: 'Video not found',
        details: `Video with ID ${id} does not exist in the database.`,
        availableVideoIds: availableVideoIds
      });
    }

    // Delete the video found by videoId
    await Video.deleteOne({ videoId: id });
    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ message: 'Error deleting video', error: error.message });
  }
});

module.exports = router; 