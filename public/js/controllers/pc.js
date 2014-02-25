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
  socket.on('gestures:connected', function() {
    $location.path('/gestures');
  });
  socket.on('dpad:connected', function() {
    $location.path('/dpad');
  });
}).

// controller for PC gestures demo
controller('PcGesturesCtrl', function($scope, socket) {
  $scope.gesture = 'Try something on your mobile...';

  socket.on('gestures:notify', function(data) {
    $scope.gesture = data.gesture;
  });
}).

// controller for PC D-pad demo
controller('PcDpadCtrl', function($scope, socket) {
  var duration = 20000; // target will stop moving after 20 s...

  // A couple things...
  // 1. Using jquery is not very angular...
  // 2. Also, probably shouldn't use animate() to move target, 
  //    but it was the quickest way to illustrate...
  socket.on('dpad:move', function(data) {
    switch(data.direction) {
      case 'up':
        if(data.isSelected) {
          $("#dpad-target").animate({ top: "-=2000" }, duration);  
        }
        else {
          $("#dpad-target").stop();
        }
        break;
      case 'down':
        if(data.isSelected) {
          $("#dpad-target").animate({ top: "+=2000" }, duration);  
        }
        else {
          $("#dpad-target").stop();
        }
        break;
      case 'left':
        if(data.isSelected) {
          $("#dpad-target").animate({ left: "-=2000" }, duration);  
        }
        else {
          $("#dpad-target").stop();
        }
        break;
      case 'right':
        if(data.isSelected) {
          $("#dpad-target").animate({ left: "+=2000" }, duration);  
        }
        else {
          $("#dpad-target").stop();
        }
        break;
    }
  });
});