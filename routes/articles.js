var express = require('express');
var router = express.Router();
var Article = require('../models/Article');

router.get('/', async function (req, res) {
  var articles = await Article.find();

  res.render('index', { articles: articles });
});

module.exports = router;
