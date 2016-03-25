(function() {
  'use strict';
  var existingModule = angular.module('angularModule');
  existingModule.directive('items', function() {
    return {
      templateUrl: 'templates/items.html',
      controller: 'controller'
    };
  });
}());