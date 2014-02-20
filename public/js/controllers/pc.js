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
  socket.on('dpad:connected', function() {
    $location.path('/dpad');
  });
  socket.on('trackpad:connected', function() {
    $location.path('/trackpad');
  });
}).

// controller for PC D-pad demo
controller('PcDpadCtrl', function($scope, socket) {
  socket.on('dpad:moveUp', function() {
    console.log('dpad:moveUp');
  });
  socket.on('dpad:moveLeft', function() {
    console.log('dpad:moveLeft');
  });
  socket.on('dpad:moveRight', function() {
    console.log('dpad:moveRight');
  });
  socket.on('dpad:moveDown', function() {
    console.log('dpad:moveDown');
  });
});