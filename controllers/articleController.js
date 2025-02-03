// Example controller definitions

const Article = require('../models/Article'); // Assuming you have an Article model

exports.createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    const article = await Article.create({ title, content, userId: req.user.id });
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create article', error: error.message });
  }
};

exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get articles', error: error.message });
  }
};

exports.getArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get article', error: error.message });
  }
};
