const express = require('express');
const multer = require('multer');
const { createArticle, getArticles, getArticle, uploadFile } = require('../controllers/articleController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage: storage });

// Public routes
router.get('/', getArticles);
router.get('/:id', getArticle);

// Protected routes
router.post('/', protect, createArticle);
router.post('/upload', protect, upload.single('file'), uploadFile);

module.exports = router;
