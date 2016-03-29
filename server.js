'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var Item = require('./database/models/item');
require('./database/connector.js');
require('./database/initializer.js');

var server = express();
var port = 3000;

var DIR_NAME = 'static';
server.use('/', express.static(DIR_NAME));

server.use(bodyParser.json());

// Save items
server.post('/items', function(req, res) {
  var items = req.body;
  Item.remove({}, function() {});
  items.forEach(function(item) {
    Item.create(item, function() {});
  });
  res.end();
});

// Retrieve items
server.get('/items', function(req, res) {
  Item.find({}, function(err, items) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ items: items });
  });
});

server.listen(port, function() {
  console.log('Server listening on port ' + port + '.');
});