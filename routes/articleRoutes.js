const express = require('express');
const multer = require('multer');
const { createArticle, getArticles, getArticle } = require('../controllers/articleController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/', protect, createArticle);
router.get('/', getArticles);
router.get('/:id', getArticle);

// Define an endpoint for file uploads
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.status(200).send({ filename: req.file.filename, path: req.file.path });
});

module.exports = router;
