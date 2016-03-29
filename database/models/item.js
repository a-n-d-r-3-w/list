'use strict';

var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  name: String,
  completed: Boolean
});

var model = mongoose.model('Item', itemSchema);

module.exports = model;