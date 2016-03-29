'use strict';

var express = require('express');
var server = express();
var port = 3000;

var DIR_NAME = 'static';
server.use('/', express.static(DIR_NAME));

server.listen(port, function() {
  console.log('Server listening on port ' + port + '.');
});