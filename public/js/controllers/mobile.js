'use strict';

/* Admin controllers */

angular.module('multi-screen-demo.controllers.mobile', [
]).
// controller for Mobile Code
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
});