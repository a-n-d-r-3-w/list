'use strict';

var Item = require('./models/item');

var items = [
  'Clean family room',
  'Clean entranceway shelf',
  'Clean desk'
];

items.forEach(function(item) {
  Item.find({ 'name': item }, function(err, items) {
    if (!err && !items.length) {
      Item.create({ completed: false, name: item });
    }
  });
});