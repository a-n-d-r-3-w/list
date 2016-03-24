(function() {
  'use strict';
  var existingModule = angular.module('angularModule');
  existingModule.directive('todos', function() {
    return {
      templateUrl: 'templates/todos.html',
      controller: 'controller'
    };
  }).directive('focusOn', function($timeout) {
    return function(scope, element, attrs) {
      scope.$on(attr.focusOn, function(e) {
        $timeout(function() {
          element[0].focus();
        });
      });
    };
  });
}());