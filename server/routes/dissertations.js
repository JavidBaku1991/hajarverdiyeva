const express = require('express');
const router = express.Router();
const Dissertation = require('../models/Dissertation');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create directories if they don't exist
    const uploadPath = file.fieldname === 'file' ? 'uploads/dissertations' : 'uploads/dissertations/images';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Create unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'file') {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed for the dissertation file'));
    }
  } else if (file.fieldname === 'image') {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed for the cover image'));
    }
  }
  cb(null, true);
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit for files
  }
});

// Get all dissertations
router.get('/', async (req, res) => {
  try {
    const dissertations = await Dissertation.find().sort({ createdAt: -1 });
    res.json(dissertations);
  } catch (error) {
    console.error('Error fetching dissertations:', error);
    res.status(500).json({ message: 'Error fetching dissertations', error: error.message });
  }
});

// Add a new dissertation
router.post('/', upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]), async (req, res) => {
  try {
    console.log('Received files:', req.files);
    console.log('Received body:', req.body);

    if (!req.files || !req.files.file || !req.files.image) {
      return res.status(400).json({ message: 'Both PDF file and image are required' });
    }

    const dissertation = new Dissertation({
      title: req.body.title,
      file: `/uploads/dissertations/${req.files.file[0].filename}`,
      image: `/uploads/dissertations/images/${req.files.image[0].filename}`
    });

    const savedDissertation = await dissertation.save();
    console.log('Saved dissertation:', savedDissertation);
    res.status(201).json(savedDissertation);
  } catch (error) {
    console.error('Error creating dissertation:', error);
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
    const dissertation = await Dissertation.findById(req.params.id);
    if (!dissertation) {
      return res.status(404).json({ message: 'Dissertation not found' });
    }

    // Delete the files from the filesystem
    const filePath = path.join(__dirname, '..', dissertation.file);
    const imagePath = path.join(__dirname, '..', dissertation.image);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Dissertation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Dissertation deleted successfully' });
  } catch (error) {
    console.error('Error deleting dissertation:', error);
    res.status(500).json({ message: 'Error deleting dissertation', error: error.message });
  }
});

module.exports = router; 