(function() {
  'use strict';

  var existingModule = angular.module('angularModule');

  existingModule.controller('controller', function($scope, service) {
    $scope.addTodo = function(index) {
      var todo = {
        name: 'New item'
      };
      index = (typeof index == 'number') ? index : $scope.todos.length;
      $scope.todos.splice(index, 0, todo);
    };

    $scope.helloWorld = service.helloWorld;

    service.getTodos(function(response) {
      $scope.todos = response.data;
    });

    $scope.deleteTodo = function(todo, $index) {
      // service.deleteTodo(todo);
      $scope.todos.splice($index, 1);
    };

    $scope.saveTodos = function() {
      // var filteredTodos = $scope.todos.filter(function(todo) {
      //   if(todo.edited) {
      //     return todo;
      //   };
      // });
      // service.saveTodos(filteredTodos);
    };
  });
}());