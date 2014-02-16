'use strict';

/* Admin controllers */

angular.module('multi-screen-demo.controllers.pc', [
]).
// controller for PC Code
controller('PcCodeCtrl', function($scope, socket) {
  socket.on('server:code', function(data) {
    $scope.code = data.code;
  });
});