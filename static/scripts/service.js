(function() {
  'use strict';

  var existingModule = angular.module('angularModule');

  existingModule.service('service', function($http) {

    this.getItems = function(callback) {
      $http.get('/items').then(callback);
    };

    this.saveItems = function(items) {
      $http.post('/items', items);
    };

    this.deleteItem = function(item) {
      console.log("The " + item.name + " item has been deleted!");
    };

  });
}());