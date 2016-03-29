(function() {
  'use strict';

  var existingModule = angular.module('angularModule');

  existingModule.service('service', function($http) {
    this.getItems = function(callback) {
      $http.get('mock/items.json').then(callback);
    };

    this.deleteItem = function(item) {
      console.log("The " + item.name + " item has been deleted!");
    };

    this.saveItems = function(items) {
      console.log(items.length + " items have been saved!");
    };

  });
}());