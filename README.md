# GrapeScrape
Homework #15

## Live Link
 - https://grapescrape.herokuapp.com/

## Description
1. Once you open the app, you'll first want to start scraping articles from our tech source, TechCrunch
2. Then, save the articles you'd like to keep for future reference
3. Optionally, delete articles and add or delete individualized notes

## Requirements
- Scrape news stories from a given site (TechCrunch) and save selected data onto MongoDB
- Allow users to save and delete news stories as well as leave comments

## Technologies Used
- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- Handlebars
- MongoDB
- Mongoose
- Cheerio

## Code Explanation
- The most satisfying part of the assignment was applying `async/await` to a function, which is a new JavaScript ES2017 feature. Instead of using the standard promise syntax, here we wait for mongoose to query the database and then move on to the rendering of the view. The `populate` method is chained to the initial `find` in order to translate `ObjectId`'s into actual notes.

```
router.get('/', async function (req, res) {
  var articles = await Article.find()
    .sort({'_id': -1})
    .populate('notes')
    .exec(function (err, doc) {
      if (err) throw err;

      console.log(doc);
    });

  res.render('index', { articles: articles });
});
```