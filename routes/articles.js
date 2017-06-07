var express = require('express');
var router = express.Router();
var Article = require('../models/Article');

router.get('/', async function (req, res) {
  var articles = await Article.find();

  res.render('index', { articles: articles });
});

router.get('/delete/:id', function (req, res) {
  var id = req.params.id;

  Article.findByIdAndRemove(id, function (err) {
    if (err) throw err;

    res.redirect('/articles');
  });
});

module.exports = router;
