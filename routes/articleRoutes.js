const express = require('express');
const multer = require('multer');
const { uploadArticle, getArticles, getArticleById } = require('../controllers/articleController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), uploadArticle);
router.get('/', getArticles);
router.get('/:id', getArticleById);

module.exports = router;
