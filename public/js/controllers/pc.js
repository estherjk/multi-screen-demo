'use strict';

/* Admin controllers */

angular.module('multi-screen-demo.controllers.pc', [
]).
// controller for PC Code
controller('PcCodeCtrl', function($scope, $location, socket) {
  socket.on('pair:sendCode', function(data) {
    $scope.code = data.code;
  });

  socket.on('pair:connected', function() {
    $location.path('/main');
  });
});