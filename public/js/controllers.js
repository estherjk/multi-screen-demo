'use strict';

/* Admin controllers */

angular.module('multi-screen-demo.controllers', [
]).
// sample controller for the home page
controller('HomeCtrl', function($scope, socket, User) {
  socket.on('send:time', function(data) {
    $scope.time = data.time;
  });

  $scope.user = User.query();
}).

// sample controller for the about page
controller('AboutCtrl', function($scope) {
  $scope.description = 'MEAN is a full stack JavaScript environment for developing web applications';
});