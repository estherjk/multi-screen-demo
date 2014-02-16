'use strict';

/* Admin controllers */

angular.module('multi-screen-demo.controllers.index', [
]).
// controller for head element
controller('HeadCtrl', function($scope, socket) {
  $scope.deviceType = window.deviceType;

  socket.on('server:init', function() {
    socket.emit('client:device', { deviceType: window.deviceType });
  });
});