var express = require('express');
var router = express.Router();
var Article = require('../models/Article');
var Note = require('../models/Note');

router.get('/', async function (req, res) {
  var articles = await Article.find()
    .populate('notes')
    .exec(function (err, doc) {
      if (err) throw err;

      console.log(doc);
    });

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

  var newNote = new Note(req.body);

  newNote.save(function (err, doc) {
    if (err) throw err;

    Article.findByIdAndUpdate(
      id,
      {$push: {'notes': doc._id}},
      {new: true},
      function (err, newdoc) {
        if (err) throw err;

        res.send(newdoc);
      }
    );
  });
});

router.get('/delete-note/:id', function (req, res) {
  var id = req.params.id;

  Note.findByIdAndRemove(id, function (err) {
    if (err) throw err;

    res.redirect('/articles');
  });
});

module.exports = router;
