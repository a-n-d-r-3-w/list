(function() {
  'use strict';
  var existingModule = angular.module('angularModule');
  existingModule.directive('todos', function() {
    return {
      templateUrl: 'templates/todos.html',
      controller: 'controller'
    };
  });
}());