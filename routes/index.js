var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var Article = require('../models/Article');

// Get Homepage
router.get('/', function (req, res) {
  res.render('index');
});

// Scrape from Source
router.get('/scrape', function (req, res) {
  request('https://techcrunch.com/', function (error, response, html) {
    var $ = cheerio.load(html);

    $('div.block-content').each(function (i, element) {
      var result = {};

      result.title = $(this).children('h2').text();
      result.link = $(this).children('h2').children('a').attr('href');
      result.excerpt = $(this).children('p.excerpt').text();
      result.image = $(this).children('span').children('a.thumb').children('img').data('src');

      var entry = new Article(result);

      entry.save(function (err, doc) {
        if (err) {
          console.log(err);
        } else {
          console.log(doc);
        }
      });
    });
  });

  res.redirect('/');
});

module.exports = router;
