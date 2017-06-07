// Require mongoose
var mongoose = require('mongoose');

// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var ArticleSchema = new Schema({
  // title is a required string
  title: {
    type: String,
    required: true
  },
  // link is a required string
  link: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'https://s0.wp.com/wp-content/themes/vip/techcrunch-2013/assets/images/210x210.png'
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }]
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model('Article', ArticleSchema);

// Export the model
module.exports = Article;
