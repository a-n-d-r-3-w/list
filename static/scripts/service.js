(function() {
  'use strict';

  var existingModule = angular.module('angularModule');

  existingModule.service('service', function($http) {

    this.getItems = function(callback) {
      $http.get('/items').then(callback);
    };

    this.deleteItem = function(item) {
      console.log("The " + item.name + " item has been deleted!");
    };

    this.saveItems = function(items) {
      console.log(items.length + " items have been saved!");
    };

  });
}());