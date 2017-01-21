// app/models/todo.js

// load mongoose since we need it to define a models
var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
  text : String,
  done : Boolean
});
