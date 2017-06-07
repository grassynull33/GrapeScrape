var express = require('express');
var router = express.Router();
var Article = require('../models/Article');
var Note = require('../models/Note');

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

router.post('/add-note/:id', function (req, res) {
  var id = req.params.id;

  var note = new Note(req.body);

  note.save(function (err, doc) {
    if (err) throw err;

    Article.findOneAndUpdate({ _id: id }, { 'note': doc._id }).exec(function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        console.log(doc);
      }
    });
  });
});

module.exports = router;
