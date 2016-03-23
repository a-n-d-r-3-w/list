(function() {
  'use strict';

  var existingModule = angular.module('angularModule');

  existingModule.service('service', function($http) {
    this.getTodos = function(callback) {
      $http.get('mock/todos.json').then(callback);
    };

    this.deleteTodo = function(todo) {
      console.log("The " + todo.name + " todo has been deleted!");
    };

    this.saveTodos = function(todos) {
      console.log(todos.length + " todos have been saved!");
    };

  });
}());