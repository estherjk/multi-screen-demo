'use strict';

/* PC controllers */

angular.module('multi-screen-demo.controllers.pc', [
]).
// controller for PC code
controller('PcCodeCtrl', function($scope, $location, socket) {
  socket.on('pair:sendCode', function(data) {
    $scope.code = data.code;
  });

  socket.on('pair:connected', function() {
    $location.path('/main');
  });
}).

// controller for main PC page
controller('PcMainCtrl', function($scope, $location, socket) {
  socket.on('keypad:connected', function() {
    $location.path('/keypad');
  });

  socket.on('trackpad:connected', function() {
    $location.path('/trackpad');
  });
});