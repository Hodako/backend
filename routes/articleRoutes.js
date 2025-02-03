const express = require('express');
const multer = require('multer');
const { createArticle, getArticles, getArticle } = require('../controllers/articleController');
const { protect } = require('../middlewares/authMiddleware'); // Ensure this path is correct
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
router.post('/upload', protect, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.status(200).send({ filename: req.file.filename, path: req.file.path });
});

module.exports = router;
