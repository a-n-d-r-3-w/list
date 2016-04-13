'use strict';

var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  name: String,
  completed: Boolean
});

var itemsSchema = new mongoose.Schema({
  items: [itemSchema]
});

// var model = mongoose.model('Item', itemSchema);
var model = mongoose.model('Items', itemsSchema);

module.exports = model;
