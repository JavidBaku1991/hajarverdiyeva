const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = file.fieldname === 'file' ? 'uploads/articles' : 'uploads/articles/images';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'file') {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed for the article file'));
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

// Get all articles
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all articles...');
    const articles = await Article.find()
      .sort({ createdAt: -1 })
      .lean();
    
    console.log('Total articles found:', articles.length);
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Error fetching articles', error: error.message });
  }
});

// Add a new article
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

    const article = new Article({
      title: req.body.title,
      file: `/uploads/articles/${req.files.file[0].filename}`,
      image: `/uploads/articles/images/${req.files.image[0].filename}`
    });

    const savedArticle = await article.save();
    console.log('Saved article:', savedArticle);
    res.status(201).json(savedArticle);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(400).json({ message: 'Error creating article', error: error.message });
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
router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Delete the files from the filesystem
    const filePath = path.join(__dirname, '..', article.file);
    const imagePath = path.join(__dirname, '..', article.image);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
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