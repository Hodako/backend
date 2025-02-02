const Article = require('../models/Article');

exports.uploadArticle = async (req, res) => {
  try {
    const { title, content, tags, userId } = req.body;
    const thumbnail = req.file ? req.file.filename : null;
    const publishDate = new Date();
    const article = await Article.create({ title, content, tags, thumbnail, publishDate, userId });
    res.status(201).json({ message: 'Article uploaded successfully', article });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading article', error });
  }
};

exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles', error });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching article', error });
  }
};
