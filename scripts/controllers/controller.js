(function() {
  'use strict';

  var existingModule = angular.module('angularModule');
  existingModule.controller('controller', function($scope, $timeout, service) {

    $scope.moveTo = function(targetIndex) {
      var sourceIndex = $scope.sourceIndex;
      var todo = $scope.todos[$scope.sourceIndex];
      $scope.todos.splice(sourceIndex, 1);
      if (targetIndex > sourceIndex) {
        targetIndex -= 1;
      }
      $scope.todos.splice(targetIndex, 0, todo);
      $scope.moving = false;
    };

    $scope.showTargets = function(sourceIndex) {
      $scope.sourceIndex = sourceIndex;
      $scope.moving = true;
    };

    $scope.handleKeyDown = function(event, index) {
      var keyCode = event.keyCode;
      var todo = $scope.todos[index];
      if (keyCode === 13) {
        todo.name = event.target.value;
        todo.editing = false;
        return;
      }
      if (keyCode === 27) {
        todo.editing = false;
        return;
      }
    };

    $scope.addTodo = function(index) {
      var todo = {
        name: ''
      };
      index = (typeof index == 'number') ? index : $scope.todos.length;
      $scope.todos.splice(index, 0, todo);
      todo.editing = true;
    };

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