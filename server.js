'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var q = require('q');
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
  var queue = [];

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var id = item._id;
    if (id) {
      queue.push(Item.findByIdAndUpdate(id, {$set: {index: item.index}}));
    } else {
      var newItem = new Item(item);
      queue.push(newItem.save(function (err, newItem) {
        if (err) {
          console.error(err);
        }
      }));
    }

    q.all(queue).then(function (results) {
      res.json({items: results});
    });
  }
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
