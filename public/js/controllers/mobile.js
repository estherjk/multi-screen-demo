'use strict';

/* Mobile controllers */

angular.module('multi-screen-demo.controllers.mobile', [
]).
// controller for mobile code
controller('MobileCodeCtrl', function($scope, $location, socket) {
  $scope.submitCode = function() {
    socket.emit('pair:getCode', { code: $scope.code });
  };

  socket.on('pair:connected', function() {
    $location.path('/main');
  });

  $scope.isCodeInvalid = false;
  socket.on('pair:fail', function() {
    $scope.isCodeInvalid = true;
  });
}).

// controller for mobile navbar
controller('MobileNavbarCtrl', function($scope, $location, socket) {
  $scope.selectMain = function() {
    socket.emit('main:init', {});
    $location.path('/main');
  };
}).

// controller for mobile demo list
controller('MobileDemoListCtrl', function($scope, $location, socket) {
  $scope.selectKeypad = function() {
    socket.emit('keypad:init', {});
    $location.path('/keypad');
  };

  $scope.selectTrackpad = function() {
    socket.emit('trackpad:init', {});
    $location.path('/trackpad');
  };
});