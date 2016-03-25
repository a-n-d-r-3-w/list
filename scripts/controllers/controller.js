(function() {
  'use strict';

  var existingModule = angular.module('angularModule');
  existingModule.controller('controller', function($scope, $timeout, service) {

    $scope.moveTo = function(targetIndex) {
      targetIndex = (typeof targetIndex == 'number') ? targetIndex : $scope.items.length;
      var sourceIndex = $scope.sourceIndex;
      var item = $scope.items[$scope.sourceIndex];
      $scope.items.splice(sourceIndex, 1);
      if (targetIndex > sourceIndex) {
        targetIndex -= 1;
      }
      $scope.items.splice(targetIndex, 0, item);
      $scope.moving = false;
      item.moving = false;
    };

    $scope.showTargets = function(sourceIndex) {
      $scope.sourceIndex = sourceIndex;
      $scope.moving = true;
      $scope.items[sourceIndex].moving = true;
    };

    $scope.handleKeyDown = function(event, index) {
      var keyCode = event.keyCode,
        item = $scope.items[index],
        ENTER_KEY_CODE = 13,
        ESC_KEY_CODE = 27;
      if (keyCode === ENTER_KEY_CODE) {
        item.name = event.target.value;
        item.editing = false;
        return;
      }
      if (keyCode === ESC_KEY_CODE) {
        item.editing = false;
        if (item.adding) {
          $scope.deleteItem([], index);
        }
        return;
      }
    };

    $scope.addItem = function(index) {
      var item = {
        name: ''
      };
      index = (typeof index == 'number') ? index : $scope.items.length;
      $scope.items.splice(index, 0, item);
      item.editing = true;
      item.adding = true;
    };

    service.getItems(function(response) {
      $scope.items = response.data;
    });

    $scope.deleteItem = function(item, $index) {
      // service.deleteItem(item);
      $scope.items.splice($index, 1);
    };

    $scope.saveItems = function() {
      // var filteredItems = $scope.items.filter(function(item) {
      //   if(item.edited) {
      //     return item;
      //   };
      // });
      // service.saveItems(filteredItems);
    };
  });
}());