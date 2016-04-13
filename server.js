'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var Item = require('./database/models/item');
require('./database/connector.js');

var server = express();
var port = process.env.PORT || 5000;

var DIR_NAME = 'static';
server.use('/', express.static(DIR_NAME));

server.use(bodyParser.json());

// Save items
server.post('/items', function(req, res) {
  var items = req.body;

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var id = item._id;
    console.info('Name: ' + item.name);
    if (id) {
      console.info('Found _id: ' + id + ' and updating index.');
      Item.findByIdAndUpdate(id, {$set: {index: item.index}});
    } else {
      console.info('Id not found');
      var newItem = new Item(item);
      newItem.save(function (err, newItem) {
        if (err) {
          console.error(err);
        } else {
          console.info('Added item: ' + newItem.name);
        }
        // Get updated items from db and store in angular

        // Or is there some way mongoose can notify the angular app?
      })
    }
  }

  setTimeout(function () {
    res.end();
  }, 5000);

  // Item.remove({}, function() {
  //   Item.collection.insert(items, function () {
  //     res.end();
  //     console.info('Saved items');
  //   })
  // });
});

// Retrieve items
server.get('/items', function(req, res) {
  Item.find({}).sort({ index: 'asc' })
    .exec(function(err, items) {
      if (err) {
        console.error('Error retrieving items');
        return res.status(500).json({ message: err.message });
      }
      res.json({ items: items });
    });
  console.info('Retrieved items');
});

server.listen(port, function() {
  console.log('Server listening on port ' + port + '.');
});
