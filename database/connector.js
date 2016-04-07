'use strict';

var mongoose = require('mongoose');
var devUri = 'mongodb://localhost/todo2';
var productionUri = 'mongodb://user1:pass1@ds029638.mlab.com:29638/heroku_8s8rk4mw';

mongoose.connect(devUri, function(err) {
  if (err) {
    console.error(err.message);
    console.log('Failed connecting to MongoDB.');
  } else {
    console.log('Successfully connected to MongoDB.');
  }
});