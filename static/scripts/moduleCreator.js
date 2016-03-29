'use strict';
var angular = require('angular');
require('ng-focus-if');

angular.module('angularModule', ['focus-if']);

require('./service.js');
require('./controller.js');
require('./directives/items.js');