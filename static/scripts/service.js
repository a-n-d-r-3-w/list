(function() {
  'use strict';
  console.error('test source map');
  var existingModule = angular.module('angularModule');

  existingModule.service('service', function($http) {

    this.getItems = function(callback) {
      $http.get('/items').then(callback);
    };

    this.saveItems = function(items) {
      $http.post('/items', items);
    };

  });
}());