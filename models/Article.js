const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Article = sequelize.define('Article', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  comments: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  shares: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  views: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  readTime: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  publishDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Article;
