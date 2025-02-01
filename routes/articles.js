// routes/articles.js
const express = require('express');
const pool = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Upload article endpoint
router.post('/upload', authenticateToken, async (req, res) => {
  const { title, author, abstract, tags, imageUrl } = req.body;
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      'INSERT INTO articles (title, author, abstract, tags, image_url, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, author, abstract, tags, imageUrl, userId]
    );
    const article = result.rows[0];
    res.json({ article });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading article' });
  }
});

module.exports = router;
