const Article = require('../models/Article');

exports.createArticle = async (req, res) => {
  try {
    const { title, content, tags, publishDate, readTime } = req.body;
    const file = req.file ? req.file.filename : null;
    const article = await Article.create({
      title,
      content,
      thumbnail: file,
      tags: tags ? JSON.parse(tags) : [],
      publishDate,
      readTime,
      userId: req.user.id,
    });
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create article', error: error.message });
  }
};

exports.uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.status(200).send({ filename: req.file.filename, path: req.file.path });
};
