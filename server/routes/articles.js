const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { auth, isAdmin } = require('../middleware/auth');

// Create upload directories if they don't exist
const uploadDirs = ['uploads/articles', 'uploads/articles/images'];
uploadDirs.forEach(dir => {
  const fullPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/articles');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and images are allowed.'), false);
    }
  }
});

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  console.error('Multer error:', err);
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  } else if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};

// Get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Error fetching articles', error: error.message });
  }
});

// Add a new article
router.post('/', auth, isAdmin, upload.fields([
  { name: 'pdfFile', maxCount: 1 },
  { name: 'imageFile', maxCount: 1 }
]), async (req, res) => {
  try {
    console.log('Received files:', req.files);
    console.log('Received body:', req.body);

    if (!req.files || !req.files.pdfFile || !req.files.imageFile) {
      return res.status(400).json({ message: 'Both PDF and image files are required' });
    }

    const article = new Article({
      title: req.body.title,
      pdfFile: `/uploads/articles/${req.files.pdfFile[0].filename}`,
      imageFile: `/uploads/articles/${req.files.imageFile[0].filename}`
    });

    await article.save();
    res.status(201).json(article);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ message: 'Error creating article', error: error.message });
  }
});

// Update an article
router.put('/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(400).json({ message: 'Error updating article', error: error.message });
  }
});

// Delete an article
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Delete the files
    const pdfPath = path.join(__dirname, '..', article.pdfFile);
    const imagePath = path.join(__dirname, '..', article.imageFile);

    if (fs.existsSync(pdfPath)) {
      fs.unlinkSync(pdfPath);
    }
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ message: 'Error deleting article', error: error.message });
  }
});

module.exports = router; 