angular.module('angularModule')
.directive('todos', function() {
  return {
    templateUrl: 'templates/todos.html',
    controller: 'controller'
  }
})