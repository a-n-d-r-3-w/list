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



// Create item
server.post('/items', function(req, res) {
  var item = req.body;
  Item.create(item, function(err, item) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ 'item': item, message: 'Item created' });
  });
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

// Update item
server.put('/items/:id', function(req, res) {
  var id = req.params.id;
  var item = req.body;
  if (item && item._id !== id) {
    return res.status(500).json({ err: "Ids don't match!" });
  }
  Item.findByIdAndUpdate(id, item, { new: true }, function(err, item) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ 'item': item, message: 'Item updated' });
  });
});

// TODO: Add DELETE route to remove existing entries


server.listen(port, function() {
  console.log('Server listening on port ' + port + '.');
});