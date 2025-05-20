const express = require('express');
const router = express.Router();
const Monograph = require('../models/Monograph');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = file.fieldname === 'file' ? 'uploads/monographs' : 'uploads/monographs/images';
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'file') {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed for the monograph file'));
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
  fileFilter: fileFilter
});

// Create uploads directories if they don't exist
const uploadDirs = ['uploads/monographs', 'uploads/monographs/images'];
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

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
router.post('/', upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]), async (req, res) => {
  try {
    if (!req.files.file || !req.files.image) {
      return res.status(400).json({ message: 'Both PDF file and image are required' });
    }

    const monograph = new Monograph({
      title: req.body.title,
      file: `/uploads/monographs/${req.files.file[0].filename}`,
      image: `/uploads/monographs/images/${req.files.image[0].filename}`
    });

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
    const monograph = await Monograph.findById(req.params.id);
    if (!monograph) {
      return res.status(404).json({ message: 'Monograph not found' });
    }

    // Delete the files from the filesystem
    const filePath = path.join(__dirname, '..', monograph.file);
    const imagePath = path.join(__dirname, '..', monograph.image);
    
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error deleting PDF file:', err);
    });
    
    fs.unlink(imagePath, (err) => {
      if (err) console.error('Error deleting image file:', err);
    });

    await Monograph.findByIdAndDelete(req.params.id);
    res.json({ message: 'Monograph deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting monograph', error: error.message });
  }
});

module.exports = router; 